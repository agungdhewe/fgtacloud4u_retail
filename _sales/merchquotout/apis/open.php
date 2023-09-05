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
 * retail/sales/merchquotout/apis/open.php
 *
 * ====
 * Open
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header merchquotout (trn_merchquotout)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 04/01/2022
 */
$API = new class extends merchquotoutBase {
	
	public function execute($options) {
		$tablename = 'trn_merchquotout';
		$primarykey = 'merchquotout_id';
		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\merchquotout_headerHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new merchquotout_headerHandler($data, $options);
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
					"merchquotout_id" => " merchquotout_id = :merchquotout_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('trn_merchquotout A', [
				'merchquotout_id', 'unit_id', 'merchquotout_descr', 'merchquotout_dt', 'merchquotout_dtvalid', 'orderintype_id', 'partner_id', 'ae_empl_id', 'project_id', 'sales_dept_id', 'dept_id', 'orderin_ishasdp', 'orderin_dpvalue', 'ppn_taxtype_id', 'ppn_taxvalue', 'ppn_include', 'merchquotout_totalitem', 'merchquotout_totalqty', 'merchquotout_salesgross', 'merchquotout_discount', 'merchquotout_subtotal', 'merchquotout_nett', 'merchquotout_ppn', 'merchquotout_total', 'merchquotout_totaladdcost', 'merchquotout_payment', 'merchquotoutitem_estgp', 'merchquotoutitem_estgppercent', 'doc_id', 'merchquotout_version', 'merchquotout_iscommit', 'merchquotout_isapprovalprogress', 'merchquotout_isapproved', 'merchquotout_isdeclined', 'merchquotout_commitby', 'merchquotout_commitdate', 'merchquotout_approveby', 'merchquotout_approvedate', 'merchquotout_declineby', 'merchquotout_declinedate', 'merchquotout_isclose', 'merchquotout_closeby', 'merchquotout_closedate', '_createby', '_createdate', '_modifyby', '_modifydate'
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
				'merchquotout_dt' => date("d/m/Y", strtotime($record['merchquotout_dt'])),
				'merchquotout_dtvalid' => date("d/m/Y", strtotime($record['merchquotout_dtvalid'])),
				
				// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
				// 'tambahan' => 'dta',
				//'tanggal' => date("d/m/Y", strtotime($record['tanggal'])),
				//'gendername' => $record['gender']
				
				'unit_name' => \FGTA4\utils\SqlUtility::Lookup($record['unit_id'], $this->db, 'mst_unit', 'unit_id', 'unit_name'),
				'orderintype_name' => \FGTA4\utils\SqlUtility::Lookup($record['orderintype_id'], $this->db, 'mst_orderintype', 'orderintype_id', 'orderintype_name'),
				'partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
				'ae_empl_name' => \FGTA4\utils\SqlUtility::Lookup($record['ae_empl_id'], $this->db, 'mst_empl', 'empl_id', 'empl_name'),
				'project_name' => \FGTA4\utils\SqlUtility::Lookup($record['project_id'], $this->db, 'mst_project', 'project_id', 'project_name'),
				'sales_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['sales_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
				'sales_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
				'ppn_taxtype_name' => \FGTA4\utils\SqlUtility::Lookup($record['ppn_taxtype_id'], $this->db, 'mst_taxtype', 'taxtype_id', 'taxtype_name'),
				'doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
				'merchquotout_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['merchquotout_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'merchquotout_approveby' => \FGTA4\utils\SqlUtility::Lookup($record['merchquotout_approveby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'merchquotout_declineby' => \FGTA4\utils\SqlUtility::Lookup($record['merchquotout_declineby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'merchquotout_closeby' => \FGTA4\utils\SqlUtility::Lookup($record['merchquotout_closeby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),


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