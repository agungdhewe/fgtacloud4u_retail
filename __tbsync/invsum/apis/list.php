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
 * retail/tbsync/invsum/apis/list.php
 *
 * ========
 * DataList
 * ========
 * Menampilkan data-data pada tabel header invsum (sync_tbinvsum)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 24/09/2022
 */
$API = new class extends invsumBase {

	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\invsum_headerHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new invsum_headerHandler($options);
			$hnd->caller = &$this;
			$hnd->db = $this->db;
			$hnd->auth = $this->auth;
			$hnd->reqinfo = $this->reqinfo;
		} else {
			$hnd = new \stdClass;
		}


		try {
		
			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "list", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			
			$criteriaValues = [
				"search" => " A.heinv_id LIKE CONCAT('%', :search, '%') "
			];
			if (is_object($hnd)) {
				if (method_exists(get_class($hnd), 'buildListCriteriaValues')) {
					// ** buildListCriteriaValues(object &$options, array &$criteriaValues) : void
					//    apabila akan modifikasi parameter2 untuk query
					//    $criteriaValues['fieldname'] = " A.fieldname = :fieldname";  <-- menambahkan field pada where dan memberi parameter value
					//    $criteriaValues['fieldname'] = "--";                         <-- memberi parameter value tanpa menambahkan pada where
					//    $criteriaValues['fieldname'] = null                          <-- tidak memberi efek pada query secara langsung, parameter digunakan untuk keperluan lain 
					//
					//    untuk memberikan nilai default apabila paramter tidak dikirim
					//    // \FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, '--fieldscriteria--', '--value--');
					$hnd->buildListCriteriaValues($options, $criteriaValues);
				}
			}

			$where = \FGTA4\utils\SqlUtility::BuildCriteria($options->criteria, $criteriaValues);
			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			/* prepare DbLayer Temporay Data Helper if needed */
			if (is_object($hnd)) {
				if (method_exists(get_class($hnd), 'prepareListData')) {
					// ** prepareListData(object $options, array $criteriaValues) : void
					//    misalnya perlu mebuat temporary table,
					//    untuk membuat query komplex dapat dibuat disini	
					$hnd->prepareListData($options, $criteriaValues);
				}
			}


			/* Data Query Configuration */
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
			$sqlLimit = "LIMIT $maxrow OFFSET $offset";

			if (is_object($hnd)) {
				if (method_exists(get_class($hnd), 'SqlQueryListBuilder')) {
					// ** SqlQueryListBuilder(array &$sqlFieldList, string &$sqlFromTable, string &$sqlWhere, array &$params) : void
					//    menambah atau memodifikasi field-field yang akan ditampilkan
					//    apabila akan memodifikasi join table
					//    apabila akan memodifikasi nilai parameter
					$hnd->SqlQueryListBuilder($sqlFieldList, $sqlFromTable, $sqlWhere, $where->params);
				}
			}
			$sqlFields = \FGTA4\utils\SqlUtility::generateSqlSelectFieldList($sqlFieldList);


			/* Sort Configuration */
			if (!is_array($options->sortData)) {
				$options->sortData = [];
			}
			if (is_object($hnd)) {
				if (method_exists(get_class($hnd), 'sortListOrder')) {
					// ** sortListOrder(array &$sortData) : void
					//    jika ada keperluan mengurutkan data
					//    $sortData['fieldname'] = 'ASC/DESC';
					$hnd->sortListOrder($options->sortData);
				}
			}
			$sqlOrders = \FGTA4\utils\SqlUtility::generateSqlSelectSort($options->sortData);


			/* Compose SQL Query */
			$sqlCount = "select count(*) as n from $sqlFromTable $sqlWhere";
			$sqlData = "
				select 
				$sqlFields 
				from 
				$sqlFromTable 
				$sqlWhere 
				$sqlOrders 
				$sqlLimit
			";

			/* Execute Query: Count */
			$stmt = $this->db->prepare($sqlCount );
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			/* Execute Query: Retrieve Data */
			$stmt = $this->db->prepare($sqlData);
			$stmt->execute($where->params);
			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);


			/* Proces result */
			$records = [];
			foreach ($rows as $row) {
				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}

				$record = array_merge($record, [
					// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
					//'tanggal' => date("d/m/y", strtotime($record['tanggal'])),
				 	//'tambahan' => 'dta'
					 
				]);

				if (is_object($hnd)) {
					if (method_exists(get_class($hnd), 'DataListLooping')) {
						// ** DataListLooping(array &$record) : void
						//    apabila akan menambahkan field di record
						$hnd->DataListLooping($record);
					}
				}

				array_push($records, $record);
			}

			/* modify and finalize records */
			if (is_object($hnd)) {
				if (method_exists(get_class($hnd), 'DataListFinal')) {
					// ** DataListFinal(array &$records) : void
					//    finalisasi data list
					$hnd->DataListFinal($records);
				}
			}

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

};