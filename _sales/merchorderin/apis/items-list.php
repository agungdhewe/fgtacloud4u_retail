<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

if (is_file(__DIR__ .'/data-items-handler.php')) {
	require_once __DIR__ .'/data-items-handler.php';
}

use \FGTA4\exceptions\WebException;


/**
 * retail/sales/merchorderin/apis/items-list.php
 *
 * ==============
 * Detil-DataList
 * ==============
 * Menampilkan data-data pada tabel items merchorderin (trn_merchorderin)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 17/01/2022
 */
$API = new class extends merchorderinBase {

	public function execute($options) {
		$userdata = $this->auth->session_get_user();
		
		$handlerclassname = "\\FGTA4\\apis\\merchorderin_itemsHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new merchorderin_itemsHandler($data, $options);
			$hnd->caller = $this;
			$hnd->db = $this->db;
			$hnd->auth = $this->auth;
			$hnd->reqinfo = $reqinfo->reqinfo;
		} else {
			$hnd = new \stdClass;
		}


		try {

			// \FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, '--fieldscriteria--', '--value--');
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"id" => " A.merchorderin_id = :id"
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("select count(*) as n from trn_merchorderinitem A" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];


			// agar semua baris muncul
			// $maxrow = $total;

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
				select 
				A.merchorderinitem_id, A.merchitem_id, A.merchitem_art, A.merchitem_mat, A.merchitem_col, A.merchitem_size, A.merchitem_name, A.merchorderinitem_qty, A.merchorderinitem_price, A.merchorderinitem_pricediscpercent, A.merchorderinitem_isdiscvalue, A.merchorderinitem_pricediscvalue, A.merchorderinitem_subtotal, A.merchorderinitem_estgp, A.merchorderinitem_estgppercent, A.merchitemctg_id, A.merchsea_id, A.brand_id, A.itemclass_id, A.accbudget_id, A.coa_id, A.merchitem_picture, A.merchitem_priceori, A.merchitem_price, A.merchitem_pricediscpercent, A.merchitem_pricediscvalue, A.merchitem_cogs, A.merchquotoutitem_qty, A.merchquotoutitem_price, A.merchquotoutitem_pricediscpercent, A.merchquotoutitem_isdiscvalue, A.merchquotoutitem_pricediscvalue, A.merchquotoutitem_subtotal, A.merchquotoutitem_estgp, A.merchquotoutitem_estgppercent, A.merchitem_saldo, A.merchitem_saldodt, A.merchitem_lastrv, A.merchitem_lastrvdt, A.merchorderin_id, A._createby, A._createdate, A._modifyby, A._modifydate 
				from trn_merchorderinitem A
			" . $where->sql . $limit);
			$stmt->execute($where->params);
			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);

			$records = [];
			foreach ($rows as $row) {
				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}

				array_push($records, array_merge($record, [
					// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
					//'tanggal' => date("d/m/y", strtotime($record['tanggal'])),
				 	//'tambahan' => 'dta'

					'merchitem_name' => \FGTA4\utils\SqlUtility::Lookup($record['merchitem_id'], $this->db, 'mst_merchitem', 'merchitem_id', 'merchitem_name'),
					'merchitemctg_name' => \FGTA4\utils\SqlUtility::Lookup($record['merchitemctg_id'], $this->db, 'mst_merchitemctg', 'merchitemctg_id', 'merchitemctg_name'),
					'merchsea_name' => \FGTA4\utils\SqlUtility::Lookup($record['merchsea_id'], $this->db, 'mst_merchsea', 'merchsea_id', 'merchsea_name'),
					'brand_name' => \FGTA4\utils\SqlUtility::Lookup($record['brand_id'], $this->db, 'mst_brand', 'brand_id', 'brand_name'),
					'itemclass_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemclass_id'], $this->db, 'mst_itemclass', 'itemclass_id', 'itemclass_name'),
					'accbudget_name' => \FGTA4\utils\SqlUtility::Lookup($record['accbudget_id'], $this->db, 'mst_accbudget', 'accbudget_id', 'accbudget_name'),
					'coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
					 
				]));
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