<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;

/**
 * retail/sales/merchquotout/apis/list.php
 *
 * ========
 * DataList
 * ========
 * Menampilkan data-data pada tabel header merchquotout (trn_merchquotout)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 21/12/2021
 */
$API = new class extends merchquotoutBase {

	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		try {
		
			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "list", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			// \FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, '--fieldscriteria--', '--value--');
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"search" => " A.merchquotout_id LIKE CONCAT('%', :search, '%') OR A.merchquotout_descr LIKE CONCAT('%', :search, '%') ",
					"unit_id" => " A.unit_id = :unit_id ",
					"partner_id" => " A.partner_id = :partner_id "
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("
				select count(*) as n from trn_merchquotout A inner join mst_orderintype B on B.orderintype_id = A.orderintype_id
			" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
				select 
				  A.merchquotout_id, A.unit_id, A.merchquotout_descr, A.merchquotout_dt, A.merchquotout_dtvalid, A.orderintype_id, A.partner_id, A.ae_empl_id, A.project_id, A.sales_dept_id, A.dept_id, A.merchquotout_totalitem, A.merchquotout_totalqty, A.merchquotout_salesgross, A.merchquotout_discount, A.merchquotout_subtotal, A.merchquotout_nett, A.merchquotout_ppn, A.merchquotout_total, A.merchquotout_totaladdcost, A.merchquotout_payment, A.doc_id, A.merchquotout_version, A.merchquotout_iscommit, A.merchquotout_isapprovalprogress, A.merchquotout_isapproved, A.merchquotout_isdeclined, A.merchquotout_commitby, A.merchquotout_commitdate, A.merchquotout_approveby, A.merchquotout_approvedate, A.merchquotout_declineby, A.merchquotout_declinedate, A.merchquotout_isclose, A.merchquotout_closeby, A.merchquotout_closedate
				, A._createby, A._createdate, A._modifyby, A._modifydate 
				
				, B.orderintype_name, B.trxmodel_id, B.orderintype_isdateinterval, B.ppn_taxtype_id, B.ppn_taxvalue, B.ppn_include, B.pph_taxtype_id, B.pph_taxvalue, B.arunbill_coa_id, B.ar_coa_id, B.ar_coa_isbypartnertype, B.dp_coa_id, B.sales_coa_id, B.salesdisc_coa_id, B.ppn_coa_id, B.ppnsubsidi_coa_id, B.pph_coa_id

				from trn_merchquotout A inner join mst_orderintype B on B.orderintype_id = A.orderintype_id
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
					'unit_name' => \FGTA4\utils\SqlUtility::Lookup($record['unit_id'], $this->db, 'mst_unit', 'unit_id', 'unit_name'),
					'orderintype_name' => \FGTA4\utils\SqlUtility::Lookup($record['orderintype_id'], $this->db, 'mst_orderintype', 'orderintype_id', 'orderintype_name'),

					'trxmodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['trxmodel_id'], $this->db, 'mst_trxmodel', 'trxmodel_id', 'trxmodel_name'),
					'ppn_taxtype_name' => \FGTA4\utils\SqlUtility::Lookup($record['ppn_taxtype_id'], $this->db, 'mst_taxtype', 'taxtype_id', 'taxtype_name'),
					'pph_taxtype_name' => \FGTA4\utils\SqlUtility::Lookup($record['pph_taxtype_id'], $this->db, 'mst_taxtype', 'taxtype_id', 'taxtype_name'),
					'arunbill_coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['arunbill_coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
					'ar_coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['ar_coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
					'dp_coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['dp_coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
					'sales_coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['sales_coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
					'salesdisc_coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['salesdisc_coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
					'ppn_coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['ppn_coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
					'ppnsubsidi_coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['ppnsubsidi_coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
					'pph_coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['pph_coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),

					'partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
					'ae_empl_name' => \FGTA4\utils\SqlUtility::Lookup($record['ae_empl_id'], $this->db, 'mst_empl', 'empl_id', 'empl_name'),
					'project_name' => \FGTA4\utils\SqlUtility::Lookup($record['project_id'], $this->db, 'mst_project', 'project_id', 'project_name'),
					'sales_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['sales_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'sales_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
					'merchquotout_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['merchquotout_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'merchquotout_approveby' => \FGTA4\utils\SqlUtility::Lookup($record['merchquotout_approveby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'merchquotout_declineby' => \FGTA4\utils\SqlUtility::Lookup($record['merchquotout_declineby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'merchquotout_closeby' => \FGTA4\utils\SqlUtility::Lookup($record['merchquotout_closeby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					 
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