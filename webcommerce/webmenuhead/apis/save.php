<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
// require_once __ROOT_DIR . "/core/sequencer.php";

use \FGTA4\exceptions\WebException;
// use \FGTA4\utils\Sequencer;



// /* Enable Debugging */
// require_once __ROOT_DIR.'/core/debug.php';
// use \FGTA4\debug;


class DataSave extends WebAPI {
	function __construct() {
		$logfilepath = __LOCALDB_DIR . "/output/webmenuhead-save.txt";
		// debug::disable();
		// debug::start($logfilepath, "w");

		$this->debugoutput = true;
		$DB_CONFIG = DB_CONFIG[$GLOBALS['MAINDB']];
		$DB_CONFIG['param'] = DB_CONFIG_PARAM[$GLOBALS['MAINDBTYPE']];
		$this->db = new \PDO(
					$DB_CONFIG['DSN'], 
					$DB_CONFIG['user'], 
					$DB_CONFIG['pass'], 
					$DB_CONFIG['param']
		);	

	}
	
	public function execute($data, $options) {
		$tablename = 'web_menuhead';
		$primarykey = 'menuhead_id';
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

			$obj->menuhead_parent = strtoupper($obj->menuhead_parent);
			$obj->cluster_id = strtoupper($obj->cluster_id);


			// if ($obj->menuhead_notes=='--NULL--') { unset($obj->menuhead_notes); }
			// if ($obj->menuhead_target=='--NULL--') { unset($obj->menuhead_target); }
			// if ($obj->menuhead_parent=='--NULL--') { unset($obj->menuhead_parent); }





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

				$this->db->commit();
			} catch (\Exception $ex) {
				$this->db->rollBack();
				throw $ex;
			} finally {
				$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,1);
			}


			$where = \FGTA4\utils\SqlUtility::BuildCriteria((object)[$primarykey=>$obj->{$primarykey}], [$primarykey=>"$primarykey=:$primarykey"]);
			$sql = \FGTA4\utils\SqlUtility::Select($tablename , [
				$primarykey, 'menuhead_id', 'menuhead_text', 'menuhead_notes', 'menuhead_url', 'menuhead_order', 'menuhead_target', 'menuhead_isdisabled', 'menuhead_showindropdown', 'menuhead_showinaccordion', 'menuhead_isparent', 'menuhead_parent', 'menuvisibility_id', 'cluster_id', '_createby', '_createdate', '_modifyby', '_modifydate', '_createby', '_createdate', '_modifyby', '_modifydate'
			], $where->sql);
			$stmt = $this->db->prepare($sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);			

			$dataresponse = [];
			foreach ($row as $key => $value) {
				$dataresponse[$key] = $value;
			}
			$result->dataresponse = (object) array_merge($dataresponse, [
				//  untuk lookup atau modify response ditaruh disini
				'menuhead_parent_name' => \FGTA4\utils\SqlUtility::Lookup($data->menuhead_parent, $this->db, 'web_menuhead', 'menuhead_id', 'menuhead_text'),
				'menuvisibility_name' => \FGTA4\utils\SqlUtility::Lookup($data->menuvisibility_id, $this->db, 'web_menuvisibility', 'menuvisibility_id', 'menuvisibility_name'),
				'cluster_name' => \FGTA4\utils\SqlUtility::Lookup($data->cluster_id, $this->db, 'web_cluster', 'cluster_id', 'cluster_name'),
				
			]);

			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	public function NewId($param) {
					return uniqid();
	}

}

$API = new DataSave();