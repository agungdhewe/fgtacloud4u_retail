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
 * retail/tbsync/invsum/apis/open.php
 *
 * ====
 * Open
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header invsum (sync_tbinvsum)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 24/09/2022
 */
$API = new class extends invsumBase {
	
	public function execute($options) {
		$event = 'on-open';
		$tablename = 'sync_tbinvsum';
		$primarykey = 'tbinvsum_id';
		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\invsum_headerHandler";
		$hnd = null;
		if (class_exists($handlerclassname)) {
			$hnd = new invsum_headerHandler($options);
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
				"tbinvsum_id" => " tbinvsum_id = :tbinvsum_id "
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
				'tbinvsum_id' => 'A.`tbinvsum_id`', 'block' => 'A.`block`', 'dt' => 'A.`dt`', 'region_id' => 'A.`region_id`',
				'branch_id' => 'A.`branch_id`', 'heinv_id' => 'A.`heinv_id`', 'heinv_art' => 'A.`heinv_art`', 'heinv_mat' => 'A.`heinv_mat`',
				'heinv_col' => 'A.`heinv_col`', 'heinv_iskonsinyasi' => 'A.`heinv_iskonsinyasi`', 'heinv_priceori' => 'A.`heinv_priceori`', 'heinv_priceadj' => 'A.`heinv_priceadj`',
				'heinv_pricegross' => 'A.`heinv_pricegross`', 'heinv_price' => 'A.`heinv_price`', 'heinv_pricedisc' => 'A.`heinv_pricedisc`', 'heinv_pricenett' => 'A.`heinv_pricenett`',
				'gtype' => 'A.`gtype`', 'season_group' => 'A.`season_group`', 'season_id' => 'A.`season_id`', 'rvid' => 'A.`rvid`',
				'rvdt' => 'A.`rvdt`', 'rvqty' => 'A.`rvqty`', 'age' => 'A.`age`', 'heinvctg_id' => 'A.`heinvctg_id`',
				'heinvctg_name' => 'A.`heinvctg_name`', 'heinvctg_class' => 'A.`heinvctg_class`', 'heinvctg_gender' => 'A.`heinvctg_gender`', 'heinvctg_sizetag' => 'A.`heinvctg_sizetag`',
				'heinvgro_id' => 'A.`heinvgro_id`', 'heinv_group1' => 'A.`heinv_group1`', 'heinv_group2' => 'A.`heinv_group2`', 'heinv_gender' => 'A.`heinv_gender`',
				'heinv_color1' => 'A.`heinv_color1`', 'heinv_color2' => 'A.`heinv_color2`', 'heinv_color3' => 'A.`heinv_color3`', 'heinv_hscode_ship' => 'A.`heinv_hscode_ship`',
				'heinv_hscode_ina' => 'A.`heinv_hscode_ina`', 'heinv_plbname' => 'A.`heinv_plbname`', 'ref_id' => 'A.`ref_id`', 'invcls_id' => 'A.`invcls_id`',
				'heinv_isweb' => 'A.`heinv_isweb`', 'heinv_weight' => 'A.`heinv_weight`', 'heinv_length' => 'A.`heinv_length`', 'heinv_width' => 'A.`heinv_width`',
				'heinv_height' => 'A.`heinv_height`', 'heinv_webdescr' => 'A.`heinv_webdescr`', 'heinv_other1' => 'A.`heinv_other1`', 'heinv_other2' => 'A.`heinv_other2`',
				'heinv_other3' => 'A.`heinv_other3`', 'heinv_other4' => 'A.`heinv_other4`', 'heinv_other5' => 'A.`heinv_other5`', 'heinv_produk' => 'A.`heinv_produk`',
				'heinv_bahan' => 'A.`heinv_bahan`', 'heinv_pemeliharaan' => 'A.`heinv_pemeliharaan`', 'heinv_logo' => 'A.`heinv_logo`', 'heinv_dibuatdi' => 'A.`heinv_dibuatdi`',
				'heinv_modifydate' => 'A.`heinv_modifydate`', 'lastcost' => 'A.`lastcost`', 'lastcostid' => 'A.`lastcostid`', 'lastcostdt' => 'A.`lastcostdt`',
				'lastpriceid' => 'A.`lastpriceid`', 'lastpricedt' => 'A.`lastpricedt`', 'beg' => 'A.`beg`', 'rv' => 'A.`rv`',
				'tin' => 'A.`tin`', 'tout' => 'A.`tout`', 'sl' => 'A.`sl`', 'do' => 'A.`do`',
				'aj' => 'A.`aj`', 'end' => 'A.`end`', 'tts' => 'A.`tts`', 'C01' => 'A.`C01`',
				'C02' => 'A.`C02`', 'C03' => 'A.`C03`', 'C04' => 'A.`C04`', 'C05' => 'A.`C05`',
				'C06' => 'A.`C06`', 'C07' => 'A.`C07`', 'C08' => 'A.`C08`', 'C09' => 'A.`C09`',
				'C10' => 'A.`C10`', 'C11' => 'A.`C11`', 'C12' => 'A.`C12`', 'C13' => 'A.`C13`',
				'C14' => 'A.`C14`', 'C15' => 'A.`C15`', 'C16' => 'A.`C16`', 'C17' => 'A.`C17`',
				'C18' => 'A.`C18`', 'C19' => 'A.`C19`', 'C20' => 'A.`C20`', 'C21' => 'A.`C21`',
				'C22' => 'A.`C22`', 'C23' => 'A.`C23`', 'C24' => 'A.`C24`', 'C25' => 'A.`C25`',
				'_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`', '_modifydate' => 'A.`_modifydate`'
			];
			$sqlFromTable = "sync_tbinvsum A";
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
				'dt' => date("d/m/Y", strtotime($record['dt'])),
				'rvdt' => date("d/m/Y", strtotime($record['rvdt'])),
				'lastcostdt' => date("d/m/Y", strtotime($record['lastcostdt'])),
				'lastpricedt' => date("d/m/Y", strtotime($record['lastpricedt'])),
				
				// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
				// 'tambahan' => 'dta',
				//'tanggal' => date("d/m/Y", strtotime($record['tanggal'])),
				//'gendername' => $record['gender']
				


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