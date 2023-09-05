<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

if (is_file(__DIR__ .'/data-term-handler.php')) {
	require_once __DIR__ .'/data-term-handler.php';
}


use \FGTA4\exceptions\WebException;



/**
 * retail/sales/merchorderin/apis/term-open.php
 *
 * ==========
 * Detil-Open
 * ==========
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel term} merchorderin (trn_merchorderin)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 06/01/2022
 */
$API = new class extends merchorderinBase {

	public function execute($options) {
		$tablename = 'trn_merchorderinterm';
		$primarykey = 'merchorderinterm_id';
		$userdata = $this->auth->session_get_user();
		

		$handlerclassname = "\\FGTA4\\apis\\merchorderin_termHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new merchorderin_termHandler($data, $options);
			$hnd->caller = $this;
			$hnd->db = $this->db;
			$hnd->auth = $this->auth;
			$hnd->reqinfo = $reqinfo->reqinfo;
		} else {
			$hnd = new \stdClass;
		}

		try {
			$result = new \stdClass; 
			
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"merchorderinterm_id" => " merchorderinterm_id = :merchorderinterm_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('trn_merchorderinterm A', [
				'merchorderinterm_id', 'orderintermtype_id', 'merchorderinterm_descr', 'merchorderinterm_days', 'merchorderinterm_dtfrometa', 'merchorderinterm_dt', 'merchorderinterm_isdp', 'merchorderinterm_paymentpercent', 'merchorderinterm_payment', 'merchorderin_totalpayment', 'merchorderin_id', '_createby', '_createdate', '_modifyby', '_modifydate' 
			], $where->sql);

			$stmt = $this->db->prepare($sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);

			$record = [];
			foreach ($row as $key => $value) {
				$record[$key] = $value;
			}

			$result->record = array_merge($record, [
				'merchorderinterm_dtfrometa' => date("d/m/Y", strtotime($record['merchorderinterm_dtfrometa'])),
				'merchorderinterm_dt' => date("d/m/Y", strtotime($record['merchorderinterm_dt'])),
					
				// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
				// 'tambahan' => 'dta',
				//'tanggal' => date("d/m/Y", strtotime($record['tanggal'])),
				//'gendername' => $record['gender']

				'orderintermtype_name' => \FGTA4\utils\SqlUtility::Lookup($record['orderintermtype_id'], $this->db, 'mst_orderintermtype', 'orderintermtype_id', 'orderintermtype_name'),
				
				'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
			]);


			if (is_object($hnd)) {
				if (method_exists(get_class($hnd), 'DataOpen')) {
					$hnd->DataOpen($result->record);
				}
			}

			// $date = DateTime::createFromFormat('d/m/Y', "24/04/2012");
			// echo $date->format('Y-m-d');

	

			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};