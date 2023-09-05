<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
// require_once __ROOT_DIR . "/core/sequencer.php";
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;
// use \FGTA4\utils\Sequencer;



/**
 * retail/webcommerce/webeditorial/apis/save.php
 *
 * ====
 * Save
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header webeditorial (web_editorial)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 31/03/2021
 */
$API = new class extends webeditorialBase {
	
	public function execute($data, $options, $files) {
		$tablename = 'web_editorial';
		$primarykey = 'editorial_id';
		$autoid = $options->autoid;
		$datastate = $data->_state;

		$userdata = $this->auth->session_get_user();

		try {

			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "save", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			$result = new \stdClass; 
			
			$key = new \stdClass;
			$obj = new \stdClass;
			foreach ($data as $fieldname => $value) {
				if ($fieldname=='_state') { continue; }
				if ($fieldname==$primarykey) {
					$key->{$fieldname} = $value;
				}
				$obj->{$fieldname} = $value;
			}

			// apabila ada tanggal, ubah ke format sql sbb:
			// $obj->tanggal = (\DateTime::createFromFormat('d/m/Y',$obj->tanggal))->format('Y-m-d');
			$obj->editorial_datestart = (\DateTime::createFromFormat('d/m/Y',$obj->editorial_datestart))->format('Y-m-d');			$obj->editorial_dateend = (\DateTime::createFromFormat('d/m/Y',$obj->editorial_dateend))->format('Y-m-d');
			
			// $obj->editorial_id = strtoupper($obj->editorial_id);
			// $obj->editorial_title = strtoupper($obj->editorial_title);
			$obj->editorialtype_id = strtoupper($obj->editorialtype_id);
			$obj->cluster_id = strtoupper($obj->cluster_id);


			// if ($obj->editorial_preface=='--NULL--') { unset($obj->editorial_preface); }
			// if ($obj->editorial_content=='--NULL--') { unset($obj->editorial_content); }
			// if ($obj->editorial_tags=='--NULL--') { unset($obj->editorial_tags); }
			// if ($obj->editorial_keyword=='--NULL--') { unset($obj->editorial_keyword); }


			unset($obj->editorial_iscommit);
			unset($obj->editorial_commitby);
			unset($obj->editorial_commitdate);



			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {

				$action = '';
				if ($datastate=='NEW') {
					$action = 'NEW';
					if ($autoid) {
						$obj->{$primarykey} = $this->NewId([]);
					}
					$obj->_createby = $userdata->username;
					$obj->_createdate = date("Y-m-d H:i:s");
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert($tablename, $obj);
				} else {
					$action = 'MODIFY';
					$obj->_modifyby = $userdata->username;
					$obj->_modifydate = date("Y-m-d H:i:s");				
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLUpdate($tablename, $obj, $key);
				}
	
				$stmt = $this->db->prepare($cmd->sql);
				$stmt->execute($cmd->params);

				\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $obj->{$primarykey}, $action, $userdata->username, (object)[]);


				$fieldname = 'editorial_picture';	
				if (property_exists($files, $fieldname)) {

					$file_id = $obj->{$primarykey};
					$doc = $files->{$fieldname};
					$file_base64data = $doc->data;
					unset($doc->data);

					$overwrite = true;
					$res = $this->cdb->addAttachment($file_id, $doc, 'filedata', $file_base64data, $overwrite);	
					$rev = $res->asObject()->rev;

					$key->{$primarykey} = $obj->{$primarykey};
					
					$obj = new \stdClass;
					$obj->{$primarykey} = $key->{$primarykey};
					$obj->editorial_picture = $rev;
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLUpdate($tablename, $obj, $key);
					$stmt = $this->db->prepare($cmd->sql);
					$stmt->execute($cmd->params);
				}				
				
				

				$this->db->commit();
			} catch (\Exception $ex) {
				$this->db->rollBack();
				throw $ex;
			} finally {
				$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,1);
			}


			$where = \FGTA4\utils\SqlUtility::BuildCriteria((object)[$primarykey=>$obj->{$primarykey}], [$primarykey=>"$primarykey=:$primarykey"]);
			$sql = \FGTA4\utils\SqlUtility::Select($tablename , [
				$primarykey
				, 'editorial_id', 'editorial_title', 'editorial_preface', 'editorial_datestart', 'editorial_dateend', 'editorial_isdatelimit'
				, 'editorial_content', 'editorial_tags', 'editorial_keyword', 'editorial_picture', 'editorial_iscommit', 'editorial_commitby'
				, 'editorial_commitdate', 'editorial_version', 'editorialtype_id', 'editorial_isinhomecarousel', 'cluster_id'
				, '_createby', '_createdate', '_modifyby', '_modifydate', '_createby', '_createdate', '_modifyby', '_modifydate'
			], $where->sql);
			$stmt = $this->db->prepare($sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);			

			$record = [];
			foreach ($row as $key => $value) {
				$record[$key] = $value;
			}
			$result->dataresponse = (object) array_merge($record, [
				//  untuk lookup atau modify response ditaruh disini
				'editorial_datestart' => date("d/m/Y", strtotime($row['editorial_datestart'])),
				'editorial_dateend' => date("d/m/Y", strtotime($row['editorial_dateend'])),
				'editorial_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['editorial_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'editorialtype_name' => \FGTA4\utils\SqlUtility::Lookup($record['editorialtype_id'], $this->db, 'web_editorialtype', 'editorialtype_id', 'editorialtype_name'),
				'cluster_name' => \FGTA4\utils\SqlUtility::Lookup($record['cluster_id'], $this->db, 'web_cluster', 'cluster_id', 'cluster_name'),

				'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
			]);

			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	public function NewId($param) {
					return uniqid();
	}

};