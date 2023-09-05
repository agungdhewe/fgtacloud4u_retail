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
		$logfilepath = __LOCALDB_DIR . "/output/webfeedback-save.txt";
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
		$tablename = 'web_feedback';
		$primarykey = 'feedback_id';
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

			$obj->cluster_id = strtoupper($obj->cluster_id);


			// if ($obj->feedback_name=='--NULL--') { unset($obj->feedback_name); }
			// if ($obj->feedback_email=='--NULL--') { unset($obj->feedback_email); }
			// if ($obj->feedback_phone=='--NULL--') { unset($obj->feedback_phone); }
			// if ($obj->feedback_message=='--NULL--') { unset($obj->feedback_message); }
			// if ($obj->feedback_browsername=='--NULL--') { unset($obj->feedback_browsername); }
			// if ($obj->feedback_browserversion=='--NULL--') { unset($obj->feedback_browserversion); }
			// if ($obj->feedback_browseros=='--NULL--') { unset($obj->feedback_browseros); }
			// if ($obj->feedback_continent=='--NULL--') { unset($obj->feedback_continent); }
			// if ($obj->feedback_continentcode=='--NULL--') { unset($obj->feedback_continentcode); }
			// if ($obj->feedback_country=='--NULL--') { unset($obj->feedback_country); }
			// if ($obj->feedback_countrycode=='--NULL--') { unset($obj->feedback_countrycode); }
			// if ($obj->feedback_state=='--NULL--') { unset($obj->feedback_state); }
			// if ($obj->feedback_statecode=='--NULL--') { unset($obj->feedback_statecode); }
			// if ($obj->feedback_city=='--NULL--') { unset($obj->feedback_city); }
			// if ($obj->feedback_postalcode=='--NULL--') { unset($obj->feedback_postalcode); }
			// if ($obj->feedback_metrocode=='--NULL--') { unset($obj->feedback_metrocode); }
			// if ($obj->feedback_latitude=='--NULL--') { unset($obj->feedback_latitude); }
			// if ($obj->feedback_longitude=='--NULL--') { unset($obj->feedback_longitude); }
			// if ($obj->feedback_timezone=='--NULL--') { unset($obj->feedback_timezone); }
			// if ($obj->feedback_datetime=='--NULL--') { unset($obj->feedback_datetime); }





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
				$primarykey, 'feedback_id', 'feedback_name', 'feedback_email', 'feedback_phone', 'feedback_message', 'feedback_browsername', 'feedback_browserversion', 'feedback_browseros', 'feedback_continent', 'feedback_continentcode', 'feedback_country', 'feedback_countrycode', 'feedback_state', 'feedback_statecode', 'feedback_city', 'feedback_postalcode', 'feedback_metrocode', 'feedback_latitude', 'feedback_longitude', 'feedback_timezone', 'feedback_datetime', 'cluster_id', '_createby', '_createdate', '_modifyby', '_modifydate', '_createby', '_createdate', '_modifyby', '_modifydate'
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