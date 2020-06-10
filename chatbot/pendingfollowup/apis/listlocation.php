<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';

use \FGTA4\exceptions\WebException;


class DataList extends WebAPI {
	function __construct() {
		$DB_CONFIG = DB_CONFIG['KALISTABOT'];
		$DB_CONFIG['param'] = DB_CONFIG_PARAM['mariadb'];
		$this->db = new \PDO(
					$DB_CONFIG['DSN'], 
					$DB_CONFIG['user'], 
					$DB_CONFIG['pass'], 
					$DB_CONFIG['param']
		);

	}

	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		try {
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[]
			);
			
			$stmt = $this->db->prepare("
				SELECT
				A.location,
				COALESCE (B.c, 0) as pending_count,
				COALESCE (B.dt, 0) as pending_oldest
				FROM loc A left join (
					select 
					location,
					count(DISTINCT number) as c,
					FLOOR(TIME_TO_SEC(TIMEDIFF(CURRENT_TIMESTAMP(), max(m.dt)))/60)  as dt
					from message m 
					where
					needfollowup=1 and followedup=0 
					group BY 
					location 
				) B on B.location = A.location
				
			");
			$stmt->execute();
			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);

			$records = array();
			foreach ($rows as $row) {
				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}
				
				array_push($records, array_merge($record, [

				]));
			}





			$total = count($records);
			$offset = $total;
			$maxrow = $total;

			// kembalikan hasilnya
			$result->total = $total;
			$result->offset = $offset + $maxrow;
			$result->maxrow = $maxrow;
			$result->records = $records;
			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

}

$API = new DataList();