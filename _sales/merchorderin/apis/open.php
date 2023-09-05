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
 * retail/sales/merchorderin/apis/open.php
 *
 * ====
 * Open
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header merchorderin (trn_merchorderin)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 17/01/2022
 */
$API = new class extends merchorderinBase {
	
	public function execute($options) {
		$tablename = 'trn_merchorderin';
		$primarykey = 'merchorderin_id';
		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\merchorderin_headerHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new merchorderin_headerHandler($data, $options);
			$hnd->caller = $this;
			$hnd->db = $this->db;
			$hnd->auth = $this->auth;
			$hnd->reqinfo = $reqinfo->reqinfo;
		} else {
			$hnd = new \stdClass;
		}


		try {

			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "open", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			$result = new \stdClass; 
			
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"merchorderin_id" => " merchorderin_id = :merchorderin_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('trn_merchorderin A', [
				'merchorderin_id', 'unit_id', 'owner_dept_id', 'partner_id', 'merchquotout_id', 'orderin_isunreferenced', 'orderintype_id', 'merchorderin_ref', 'merchorderin_descr', 'merchorderin_dt', 'merchorderin_dteta', 'ae_empl_id', 'project_id', 'merchorderin_totalqty', 'merchorderin_total', 'orderin_ishasdp', 'orderin_dpvalue', 'ppn_taxtype_id', 'ppn_taxvalue', 'ppn_include', 'arunbill_coa_id', 'ar_coa_id', 'dp_coa_id', 'sales_coa_id', 'salesdisc_coa_id', 'ppn_coa_id', 'ppnsubsidi_coa_id', 'merchorderin_totalitem', 'merchorderin_salesgross', 'merchorderin_discount', 'merchorderin_subtotal', 'merchorderin_pph', 'merchorderin_nett', 'merchorderin_ppn', 'merchorderin_totaladdcost', 'merchorderin_payment', 'merchorderin_estgp', 'merchorderin_estgppercent', 'dept_id', 'trxmodel_id', 'doc_id', 'merchorderin_version', 'merchorderin_iscommit', 'merchorderin_commitby', 'merchorderin_commitdate', 'merchorderin_isapprovalprogress', 'merchorderin_isapproved', 'merchorderin_isdeclined', 'merchorderin_approveby', 'merchorderin_approvedate', 'merchorderin_declineby', 'merchorderin_declinedate', 'merchorderin_isclose', 'merchorderin_closeby', 'merchorderin_closedate', '_createby', '_createdate', '_modifyby', '_modifydate'
			], $where->sql);

			$stmt = $this->db->prepare($sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);

			$record = [];
			foreach ($row as $key => $value) {
				$record[$key] = $value;
			}


			$approverow = \FGTA4\utils\SqlUtility::LookupRow((object)["$this->main_primarykey"=>$record[$this->main_primarykey], "$this->approval_field_approveby"=>$userdata->username, "$this->approval_field_approve"=>'1'], $this->db, $this->approval_tablename);
			$declinerow = \FGTA4\utils\SqlUtility::LookupRow((object)["$this->main_primarykey"=>$record[$this->main_primarykey], "$this->approval_field_declineby"=>$userdata->username, "$this->approval_field_decline"=>'1'], $this->db, "$this->approval_tablename");
			

			$result->record = array_merge($record, [
				'merchorderin_dt' => date("d/m/Y", strtotime($record['merchorderin_dt'])),
				'merchorderin_dteta' => date("d/m/Y", strtotime($record['merchorderin_dteta'])),
				
				// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
				// 'tambahan' => 'dta',
				//'tanggal' => date("d/m/Y", strtotime($record['tanggal'])),
				//'gendername' => $record['gender']
				
				'unit_name' => \FGTA4\utils\SqlUtility::Lookup($record['unit_id'], $this->db, 'mst_unit', 'unit_id', 'unit_name'),
				'owner_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['owner_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
				'partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
				'merchquotout_descr' => \FGTA4\utils\SqlUtility::Lookup($record['merchquotout_id'], $this->db, 'trn_merchquotout', 'merchquotout_id', 'merchquotout_descr'),
				'orderintype_name' => \FGTA4\utils\SqlUtility::Lookup($record['orderintype_id'], $this->db, 'mst_orderintype', 'orderintype_id', 'orderintype_name'),
				'ae_empl_name' => \FGTA4\utils\SqlUtility::Lookup($record['ae_empl_id'], $this->db, 'mst_empl', 'empl_id', 'empl_name'),
				'project_name' => \FGTA4\utils\SqlUtility::Lookup($record['project_id'], $this->db, 'mst_project', 'project_id', 'project_name'),
				'ppn_taxtype_name' => \FGTA4\utils\SqlUtility::Lookup($record['ppn_taxtype_id'], $this->db, 'mst_taxtype', 'taxtype_id', 'taxtype_name'),
				'arunbill_coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['arunbill_coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
				'ar_coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['ar_coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
				'dp_coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['dp_coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
				'sales_coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['sales_coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
				'salesdisc_coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['salesdisc_coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
				'ppn_coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['ppn_coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
				'ppnsubsidi_coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['ppnsubsidi_coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
				'dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
				'trxmodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['trxmodel_id'], $this->db, 'mst_trxmodel', 'trxmodel_id', 'trxmodel_name'),
				'doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
				'merchorderin_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['merchorderin_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'merchorderin_approveby' => \FGTA4\utils\SqlUtility::Lookup($record['merchorderin_approveby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'merchorderin_declineby' => \FGTA4\utils\SqlUtility::Lookup($record['merchorderin_declineby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'merchorderin_closeby' => \FGTA4\utils\SqlUtility::Lookup($record['merchorderin_closeby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),


				'pros_isuseralreadyapproved' => $approverow!=null ? '1' : '0',
				'pros_isuseralreadydeclined' => $declinerow!=null ? '1' : '0',
			
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