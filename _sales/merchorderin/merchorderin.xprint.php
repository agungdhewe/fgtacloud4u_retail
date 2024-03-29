<?php namespace FGTA4\module; if (!defined('FGTA4')) { die('Forbiden'); } 


class PrintForm extends WebModule {
	function __construct() {
		// $logfilepath = __LOCALDB_DIR . "/output/logfile-merchorderin.txt";
		// debug::start($logfilepath, "w");
		// debug::log("start debug");

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
	
	
	public function LoadPage() {
		$this->preloadscripts = [
			'jslibs/qrious.js'
		];

		$id = $_GET['id'];


		$tablename = 'trn_merchorderin';
		$primarykey = 'merchorderin_id';

		try {

			// header
			$sql = $this->getSqlHeader();
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':merchorderin_id' => $id]);
			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);
			$row = $rows[0];

			$this->merchorderin_id = $row['merchorderin_id'];
			$this->empl_name = $row['empl_name'];

		} catch (\Exception $ex) {
			throw $ex;
		}
	}



	function getSqlHeader() {
		return "
			select 
			A.*,
			(select empl_name from mst_empl where empl_id =(select empl_id from mst_empluser where user_id = A._createby )) as empl_name
			from trn_merchorderin A where merchorderin_id = :merchorderin_id
		";
	}	


}

$MODULE = new PrintForm();