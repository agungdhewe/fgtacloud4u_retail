<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

if (is_file(__DIR__ .'/data-header-handler.php')) {
	require_once __DIR__ .'/data-header-handler.php';
}


use \FGTA4\exceptions\WebException;


/**
 * retail/sales/promoabmodel/apis/open.php
 *
 * ====
 * Open
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header promoabmodel (mst_promoabmodel)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 27/12/2022
 */
$API = new class extends promoabmodelBase {
	
	public function execute($options) {
		$event = 'on-open';
		$tablename = 'mst_promoabmodel';
		$primarykey = 'promoabmodel_id';
		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\promoabmodel_headerHandler";
		$hnd = null;
		if (class_exists($handlerclassname)) {
			$hnd = new promoabmodel_headerHandler($options);
			$hnd->caller = &$this;
			$hnd->db = $this->db;
			$hnd->auth = $this->auth;
			$hnd->reqinfo = $this->reqinfo;
			$hnd->event = $event;
		}

		try {

			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "open", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			$criteriaValues = [
				"promoabmodel_id" => " promoabmodel_id = :promoabmodel_id "
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
				'promoabmodel_id' => 'A.`promoabmodel_id`', 'promoabmodel_descr' => 'A.`promoabmodel_descr`', 'promoabrule_id' => 'A.`promoabrule_id`', 'promoabrule_code' => 'A.`promoabrule_code`',
				'promoabrule_ishasgroupa' => 'A.`promoabrule_ishasgroupa`', 'a_promoabrulesection_id' => 'A.`a_promoabrulesection_id`', 'promoab_a_label' => 'A.`promoab_a_label`', 'promoab_a_disc' => 'A.`promoab_a_disc`',
				'promoab_a_qtythreshold' => 'A.`promoab_a_qtythreshold`', 'promoab_a_qtymax' => 'A.`promoab_a_qtymax`', 'promoab_a_isreplacedisc' => 'A.`promoab_a_isreplacedisc`', 'promoab_a_isblockonmeet' => 'A.`promoab_a_isblockonmeet`',
				'promoabrule_ishasgroupb' => 'A.`promoabrule_ishasgroupb`', 'b_promoabrulesection_id' => 'A.`b_promoabrulesection_id`', 'promoab_b_label' => 'A.`promoab_b_label`', 'promoab_b_disc' => 'A.`promoab_b_disc`',
				'promoab_b_qtythreshold' => 'A.`promoab_b_qtythreshold`', 'promoab_b_qtymax' => 'A.`promoab_b_qtymax`', 'promoab_b_isreplacedisc' => 'A.`promoab_b_isreplacedisc`', 'promoab_b_isblockonmeet' => 'A.`promoab_b_isblockonmeet`',
				'_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`', '_modifydate' => 'A.`_modifydate`'
			];
			$sqlFromTable = "mst_promoabmodel A";
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



			$result->record = array_merge($record, [
				
				// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
				// 'tambahan' => 'dta',
				//'tanggal' => date("d/m/Y", strtotime($record['tanggal'])),
				//'gendername' => $record['gender']
				
				'promoabrule_name' => \FGTA4\utils\SqlUtility::Lookup($record['promoabrule_id'], $this->db, 'mst_promoabrule', 'promoabrule_id', 'promoabrule_name'),
				'a_promoabrulesection_name' => \FGTA4\utils\SqlUtility::Lookup($record['a_promoabrulesection_id'], $this->db, 'mst_promoabrulesection', 'promoabrulesection_id', 'promoabrulesection_name'),
				'b_promoabrulesection_name' => \FGTA4\utils\SqlUtility::Lookup($record['b_promoabrulesection_id'], $this->db, 'mst_promoabrulesection', 'promoabrulesection_id', 'promoabrulesection_name'),


				'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

			]);


			

			if (is_object($hnd)) {
				if (method_exists(get_class($hnd), 'DataOpen')) {
					//  DataOpen(array &$record) : void 
					$hnd->DataOpen($result->record);
				}
			}

			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};