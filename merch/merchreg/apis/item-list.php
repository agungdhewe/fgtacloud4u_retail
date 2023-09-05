<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

if (is_file(__DIR__ .'/data-item-handler.php')) {
	require_once __DIR__ .'/data-item-handler.php';
}

use \FGTA4\exceptions\WebException;


/**
 * retail/merch/merchreg/apis/item-list.php
 *
 * ==============
 * Detil-DataList
 * ==============
 * Menampilkan data-data pada tabel item merchreg (trn_merchregitem)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 27/07/2023
 */
$API = new class extends merchregBase {

	public function execute($options) {
		$userdata = $this->auth->session_get_user();
		
		$handlerclassname = "\\FGTA4\\apis\\merchreg_itemHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new merchreg_itemHandler($options);
			$hnd->caller = $this;
			$hnd->db = $this->db;
			$hnd->auth = $this->auth;
			$hnd->reqinfo = $this->reqinfo;
		} else {
			$hnd = new \stdClass;
		}


		try {

			if (method_exists(get_class($hnd), 'init')) {
				// init(object &$options) : void
				$hnd->init($options);
			}

			$criteriaValues = [
				"id" => " A.merchreg_id = :id"
			];
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

			$where = \FGTA4\utils\SqlUtility::BuildCriteria($options->criteria, $criteriaValues);
			
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			/* prepare DbLayer Temporay Data Helper if needed */
			if (method_exists(get_class($hnd), 'prepareListData')) {
				// ** prepareListData(object $options, array $criteriaValues) : void
				//    misalnya perlu mebuat temporary table,
				//    untuk membuat query komplex dapat dibuat disini	
				$hnd->prepareListData($options, $criteriaValues);
			}
			
			/* Data Query Configuration */
			$sqlFieldList = [
				'merchregitem_id' => 'A.`merchregitem_id`', 'merchitem_refcode' => 'A.`merchitem_refcode`', 'merchitem_refitem' => 'A.`merchitem_refitem`', 'merchitem_barcode' => 'A.`merchitem_barcode`',
				'merchitem_art' => 'A.`merchitem_art`', 'merchitem_mat' => 'A.`merchitem_mat`', 'merchitem_col' => 'A.`merchitem_col`', 'merchitem_size' => 'A.`merchitem_size`',
				'merchitem_combo' => 'A.`merchitem_combo`', 'merchitem_name' => 'A.`merchitem_name`', 'merchitem_descr' => 'A.`merchitem_descr`', 'merchitem_colnum' => 'A.`merchitem_colnum`',
				'merchitem_isdisabled' => 'A.`merchitem_isdisabled`', 'merchitem_pcpline' => 'A.`merchitem_pcpline`', 'merchitem_pcpgroup' => 'A.`merchitem_pcpgroup`', 'merchitem_pcpcategory' => 'A.`merchitem_pcpcategory`',
				'merchitem_colorcode' => 'A.`merchitem_colorcode`', 'merchitem_colordescr' => 'A.`merchitem_colordescr`', 'merchitem_gender' => 'A.`merchitem_gender`', 'merchitem_fit' => 'A.`merchitem_fit`',
				'merchitem_hscodeship' => 'A.`merchitem_hscodeship`', 'merchitem_hscodeina' => 'A.`merchitem_hscodeina`', 'merchitem_gtype' => 'A.`merchitem_gtype`', 'merchitem_labelname' => 'A.`merchitem_labelname`',
				'merchitem_labelproduct' => 'A.`merchitem_labelproduct`', 'merchitem_bahan' => 'A.`merchitem_bahan`', 'merchitem_pemeliharaan' => 'A.`merchitem_pemeliharaan`', 'merchitem_logo' => 'A.`merchitem_logo`',
				'merchitem_dibuatdi' => 'A.`merchitem_dibuatdi`', 'merchitem_width' => 'A.`merchitem_width`', 'merchitem_length' => 'A.`merchitem_length`', 'merchitem_height' => 'A.`merchitem_height`',
				'merchitem_weight' => 'A.`merchitem_weight`', 'merchitem_fob' => 'A.`merchitem_fob`', 'merchitemctg_id' => 'A.`merchitemctg_id`', 'merchitem_id' => 'A.`merchitem_id`',
				'mercharticle_id' => 'A.`mercharticle_id`', 'unit_id' => 'A.`unit_id`', 'dept_id' => 'A.`dept_id`', 'brand_id' => 'A.`brand_id`',
				'mercharticle_paircode' => 'A.`mercharticle_paircode`', 'merchreg_id' => 'A.`merchreg_id`', '_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`',
				'_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`', '_modifydate' => 'A.`_modifydate`'
			];
			$sqlFromTable = "trn_merchregitem A";
			$sqlWhere = $where->sql;
			$sqlLimit = "LIMIT $maxrow OFFSET $offset";

			if (method_exists(get_class($hnd), 'SqlQueryListBuilder')) {
				// ** SqlQueryListBuilder(array &$sqlFieldList, string &$sqlFromTable, string &$sqlWhere, array &$params) : void
				//    menambah atau memodifikasi field-field yang akan ditampilkan
				//    apabila akan memodifikasi join table
				//    apabila akan memodifikasi nilai parameter
				$hnd->SqlQueryListBuilder($sqlFieldList, $sqlFromTable, $sqlWhere, $where->params);
			}

			// filter select columns
			if (!property_exists($options, 'selectFields')) {
				$options->selectFields = [];
			}
			$columsSelected = $this->SelectColumns($sqlFieldList, $options->selectFields);
			$sqlFields = \FGTA4\utils\SqlUtility::generateSqlSelectFieldList($columsSelected);


			/* Sort Configuration */
			if (!property_exists($options, 'sortData')) {
				$options->sortData = [];
			}			
			if (!is_array($options->sortData)) {
				$options->sortData = [];
			}
			if (method_exists(get_class($hnd), 'sortListOrder')) {
				// ** sortListOrder(array &$sortData) : void
				//    jika ada keperluan mengurutkan data
				//    $sortData['fieldname'] = 'ASC/DESC';
				$hnd->sortListOrder($options->sortData);
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
		

			$handleloop = false;
			if (method_exists(get_class($hnd), 'DataListLooping')) {
				$handleloop = true;
			}
			
			/* Proces result */
			$records = [];
			foreach ($rows as $row) {
				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}

				/*
				$record = array_merge($record, [
					// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
					//'tanggal' => date("d/m/y", strtotime($record['tanggal'])),
				 	//'tambahan' => 'dta'
					'merchitemctg_name' => \FGTA4\utils\SqlUtility::Lookup($record['merchitemctg_id'], $this->db, 'mst_merchitemctg', 'merchitemctg_id', 'merchitemctg_name'),
					'itemstock_name' => \FGTA4\utils\SqlUtility::Lookup($record['merchitem_id'], $this->db, 'mst_itemstock', 'itemstock_id', 'itemstock_name'),
					'mercharticle_name' => \FGTA4\utils\SqlUtility::Lookup($record['mercharticle_id'], $this->db, 'mst_mercharticle', 'mercharticle_id', 'mercharticle_name'),
					'unit_name' => \FGTA4\utils\SqlUtility::Lookup($record['unit_id'], $this->db, 'mst_unit', 'unit_id', 'unit_name'),
					'dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'brand_name' => \FGTA4\utils\SqlUtility::Lookup($record['brand_id'], $this->db, 'mst_brand', 'brand_id', 'brand_name'),
					 
				]);
				*/


				// lookup data id yang refer ke table lain
				$this->addFields('merchitemctg_name', 'merchitemctg_id', $record, 'mst_merchitemctg', 'merchitemctg_name', 'merchitemctg_id');
				$this->addFields('itemstock_name', 'merchitem_id', $record, 'mst_itemstock', 'itemstock_name', 'itemstock_id');
				$this->addFields('mercharticle_name', 'mercharticle_id', $record, 'mst_mercharticle', 'mercharticle_name', 'mercharticle_id');
				$this->addFields('unit_name', 'unit_id', $record, 'mst_unit', 'unit_name', 'unit_id');
				$this->addFields('dept_name', 'dept_id', $record, 'mst_dept', 'dept_name', 'dept_id');
				$this->addFields('brand_name', 'brand_id', $record, 'mst_brand', 'brand_name', 'brand_id');
					 


				if ($handleloop) {
					// ** DataListLooping(array &$record) : void
					//    apabila akan menambahkan field di record
					$hnd->DataListLooping($record);
				}

				array_push($records, $record);
			}

			/* modify and finalize records */
			if (method_exists(get_class($hnd), 'DataListFinal')) {
				// ** DataListFinal(array &$records) : void
				//    finalisasi data list
				$hnd->DataListFinal($records);
			}


			// kembalikan hasilnya
			$result = new \stdClass; 
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