<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
// require_once __ROOT_DIR . "/core/sequencer.php";
require_once __DIR__ . '/xapi.base.php';

if (is_file(__DIR__ .'/data-header-handler.php')) {
	require_once __DIR__ .'/data-header-handler.php';
}


use \FGTA4\exceptions\WebException;
// use \FGTA4\utils\Sequencer;



/**
 * retail/tbsync/invitem/apis/save.php
 *
 * ====
 * Save
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header invitem (sync_tbinvitem)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 24/09/2022
 */
$API = new class extends invitemBase {
	
	public function execute($data, $options) {
		$event = 'on-save';
		$tablename = 'sync_tbinvitem';
		$primarykey = 'tbinvitem_id';
		$autoid = $options->autoid;
		$datastate = $data->_state;
		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\invitem_headerHandler";
		$hnd = null;
		if (class_exists($handlerclassname)) {
			$hnd = new invitem_headerHandler($options);
			$hnd->caller = &$this;
			$hnd->db = &$this->db;
			$hnd->auth = $this->auth;
			$hnd->reqinfo = $this->reqinfo;
			$hnd->event = $event;
		}

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







			// current user & timestamp	
			if ($datastate=='NEW') {
				$obj->_createby = $userdata->username;
				$obj->_createdate = date("Y-m-d H:i:s");
			} else {
				$obj->_modifyby = $userdata->username;
				$obj->_modifydate = date("Y-m-d H:i:s");	
			}

			//handle data sebelum sebelum save
			if (is_object($hnd)) {
				if (method_exists(get_class($hnd), 'DataSaving')) {
					// ** DataSaving(object &$obj, object &$key) : void
					$hnd->DataSaving($obj, $key);
				}
			}	

			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {

				$action = '';
				if ($datastate=='NEW') {
					$action = 'NEW';
					if ($autoid) {
						$obj->{$primarykey} = $this->NewId($hnd, $obj);
					}
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert($tablename, $obj);
				} else {
					$action = 'MODIFY';
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLUpdate($tablename, $obj, $key);
				}
	
				$stmt = $this->db->prepare($cmd->sql);
				$stmt->execute($cmd->params);

				\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $obj->{$primarykey}, $action, $userdata->username, (object)[]);




				// result
				$options->criteria = [
					"tbinvitem_id" => $obj->tbinvitem_id
				];

				$criteriaValues = [
					"tbinvitem_id" => " tbinvitem_id = :tbinvitem_id "
				];
				if (is_object($hnd)) {
					if (method_exists(get_class($hnd), 'buildOpenCriteriaValues')) {
						// buildOpenCriteriaValues(object $options, array &$criteriaValues) : void
						$hnd->buildOpenCriteriaValues($options, $criteriaValues);
					}
				}

				$where = \FGTA4\utils\SqlUtility::BuildCriteria($options->criteria, $criteriaValues);
				$result = new \stdClass; 
	
				if (is_object($hnd)) {
					if (method_exists(get_class($hnd), 'prepareOpenData')) {
						// prepareOpenData(object $options, $criteriaValues) : void
						$hnd->prepareOpenData($options, $criteriaValues);
					}
				}

				$sqlFieldList = [
					'tbinvitem_id' => 'A.`tbinvitem_id`', 'region_id' => 'A.`region_id`', 'heinv_id' => 'A.`heinv_id`', 'heinvitem_line' => 'A.`heinvitem_line`',
					'heinvitem_id' => 'A.`heinvitem_id`', 'heinvitem_size' => 'A.`heinvitem_size`', 'heinvitem_colnum' => 'A.`heinvitem_colnum`', 'heinvitem_barcode' => 'A.`heinvitem_barcode`',
					'_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`', '_modifydate' => 'A.`_modifydate`'
				];
				$sqlFromTable = "sync_tbinvitem A";
				$sqlWhere = $where->sql;
					
				if (is_object($hnd)) {
					if (method_exists(get_class($hnd), 'SqlQueryOpenBuilder')) {
						// SqlQueryOpenBuilder(array &$sqlFieldList, string &$sqlFromTable, string &$sqlWhere, array &$params) : void
						$hnd->SqlQueryOpenBuilder($sqlFieldList, $sqlFromTable, $sqlWhere, $where->params);
					}
				}
				$sqlFields = \FGTA4\utils\SqlUtility::generateSqlSelectFieldList($sqlFieldList);
	
			
				$sqlData = "
					select 
					$sqlFields 
					from 
					$sqlFromTable 
					$sqlWhere 
				";
	
				$stmt = $this->db->prepare($sqlData);
				$stmt->execute($where->params);
				$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
	
				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}

				$dataresponse = array_merge($record, [
					//  untuk lookup atau modify response ditaruh disini

					'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				]);
				
				if (is_object($hnd)) {
					if (method_exists(get_class($hnd), 'DataOpen')) {
						//  DataOpen(array &$record) : void 
						$hnd->DataOpen($dataresponse);
					}
				}


				$result->dataresponse = (object) $dataresponse;
				if (is_object($hnd)) {
					if (method_exists(get_class($hnd), 'DataSavedSuccess')) {
						$hnd->DataSavedSuccess($result);
					}
				}

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

	public function NewId($hnd, $obj) {
		// dipanggil hanya saat $autoid == true;

		$id = null;
		$handled = false;
		if (is_object($hnd)) {
			if (method_exists(get_class($hnd), 'CreateNewId')) {
				// CreateNewId(object $obj) : string 
				$id = $hnd->CreateNewId($obj);
				$handled = true;
			}
		}

		if (!$handled) {
			$id = uniqid();
		}

		return $id;
	}

};