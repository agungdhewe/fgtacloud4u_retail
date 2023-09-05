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
 * retail/webcommerce/webmerchraw/apis/save.php
 *
 * ====
 * Save
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header webmerchraw (web_merchraw)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 23/06/2021
 */
$API = new class extends webmerchrawBase {
	
	public function execute($data, $options) {
		$tablename = 'web_merchraw';
		$primarykey = 'merchraw_id';
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

			$obj->brand_id = strtoupper($obj->brand_id);


			// if ($obj->merchraw_name=='--NULL--') { unset($obj->merchraw_name); }
			// if ($obj->merchraw_gender=='--NULL--') { unset($obj->merchraw_gender); }
			// if ($obj->merchraw_catcode=='--NULL--') { unset($obj->merchraw_catcode); }
			// if ($obj->merchraw_catname=='--NULL--') { unset($obj->merchraw_catname); }
			// if ($obj->merchraw_line=='--NULL--') { unset($obj->merchraw_line); }
			// if ($obj->merchraw_style=='--NULL--') { unset($obj->merchraw_style); }
			// if ($obj->merchraw_stylename=='--NULL--') { unset($obj->merchraw_stylename); }
			// if ($obj->merchraw_tipologymacro=='--NULL--') { unset($obj->merchraw_tipologymacro); }
			// if ($obj->merchraw_tipology=='--NULL--') { unset($obj->merchraw_tipology); }
			// if ($obj->merchraw_sku=='--NULL--') { unset($obj->merchraw_sku); }
			// if ($obj->merchraw_skutype=='--NULL--') { unset($obj->merchraw_skutype); }
			// if ($obj->merchraw_serial1=='--NULL--') { unset($obj->merchraw_serial1); }
			// if ($obj->merchraw_serial2=='--NULL--') { unset($obj->merchraw_serial2); }
			// if ($obj->merchraw_colcode=='--NULL--') { unset($obj->merchraw_colcode); }
			// if ($obj->merchraw_colname=='--NULL--') { unset($obj->merchraw_colname); }
			// if ($obj->merchraw_colnameshort=='--NULL--') { unset($obj->merchraw_colnameshort); }
			// if ($obj->merchraw_matcode=='--NULL--') { unset($obj->merchraw_matcode); }
			// if ($obj->merchraw_matname=='--NULL--') { unset($obj->merchraw_matname); }
			// if ($obj->merchraw_matnameshort=='--NULL--') { unset($obj->merchraw_matnameshort); }
			// if ($obj->merchraw_matcmpst=='--NULL--') { unset($obj->merchraw_matcmpst); }
			// if ($obj->merchraw_liningcmpst=='--NULL--') { unset($obj->merchraw_liningcmpst); }
			// if ($obj->merchraw_solcmpst1=='--NULL--') { unset($obj->merchraw_solcmpst1); }
			// if ($obj->merchraw_solcmpst2=='--NULL--') { unset($obj->merchraw_solcmpst2); }
			// if ($obj->merchraw_madein=='--NULL--') { unset($obj->merchraw_madein); }
			// if ($obj->merchraw_widthgroup=='--NULL--') { unset($obj->merchraw_widthgroup); }
			// if ($obj->merchraw_size=='--NULL--') { unset($obj->merchraw_size); }
			// if ($obj->merchraw_dim=='--NULL--') { unset($obj->merchraw_dim); }
			// if ($obj->merchraw_dimgroup=='--NULL--') { unset($obj->merchraw_dimgroup); }
			// if ($obj->merchraw_barcode=='--NULL--') { unset($obj->merchraw_barcode); }





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




				// result
				$where = \FGTA4\utils\SqlUtility::BuildCriteria((object)[$primarykey=>$obj->{$primarykey}], [$primarykey=>"$primarykey=:$primarykey"]);
				$sql = \FGTA4\utils\SqlUtility::Select($tablename , [
					$primarykey
					, 'merchraw_id', 'merchraw_name', 'merchraw_gender', 'merchraw_catcode', 'merchraw_catname', 'merchraw_line', 'merchraw_style', 'merchraw_stylename', 'merchraw_tipologymacro', 'merchraw_tipology', 'merchraw_weightgross', 'merchraw_weightnett', 'merchraw_sku', 'merchraw_skutype', 'merchraw_serial1', 'merchraw_serial2', 'merchraw_colcode', 'merchraw_colname', 'merchraw_colnameshort', 'merchraw_matcode', 'merchraw_matname', 'merchraw_matnameshort', 'merchraw_matcmpst', 'merchraw_liningcmpst', 'merchraw_solcmpst1', 'merchraw_solcmpst2', 'merchraw_madein', 'merchraw_widthgroup', 'merchraw_size', 'merchraw_dim', 'merchraw_dimgroup', 'merchraw_dimlength', 'merchraw_dimwidth', 'merchraw_dimheight', 'merchraw_barcode', 'brand_id', '_createby', '_createdate', '_modifyby', '_modifydate', '_createby', '_createdate', '_modifyby', '_modifydate'
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
				'brand_name' => \FGTA4\utils\SqlUtility::Lookup($record['brand_id'], $this->db, 'web_brand', 'brand_id', 'brand_name'),

					'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				]);



				$this->db->commit();
				return $result;

			} catch (\Exception $ex) {
				$this->db->rollBack();
				throw $ex;
			} finally {
				$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,1);
			}

		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	public function NewId($param) {
					return uniqid();
	}

};