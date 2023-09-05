<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR.'/core/debug.php';
require_once __ROOT_DIR.'/core/approval.php';
// require_once __ROOT_DIR.'/core/currency.php';
require_once __ROOT_DIR.'/apps/fgta/framework/fgta4libs/apis/otp.php';
require_once __DIR__ . '/xtion-approve.php';

use \FGTA4\exceptions\WebException;
use \FGTA4\debug;
use \FGTA4\StandartApproval;
use FGTA4\utils\Currency;

/**
 * retail/sales/merchorderin/apis/xtion-approve.php
 *
 * =======
 * Approve
 * =======
 * Melakukan approve/decline dokumen,
 * sesuai dengan authorisasi yang di setting pada modul ent/organisation/doc
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 22/12/2021
 */
$API = new class extends merchorderinBase {

	public function execute($id, $param) {
		$tablename = 'trn_merchorderin';
		$primarykey = 'merchorderin_id';		
		$userdata = $this->auth->session_get_user();

		$param->approvalsource = [
			'id' => $id,
			'userdata' => $userdata,
			'date' => date("Y-m-d H:i:s"),
			'tablename_head' => $this->main_tablename,
			'tablename_appr' => $this->approval_tablename,
			'field_id' => $this->main_primarykey,
			'field_id_detil' => $this->approval_primarykey,

			'flag_head_isapprovalprogress' => $this->fields_isapprovalprogress,
			'flag_head_approve' => $this->field_isapprove,
			'flag_head_approveby' => $this->field_approveby,
			'flag_head_approvedate' => $this->field_approvedate,
			'flag_head_decline' => $this->field_isdecline,
			'flag_head_declineby' => $this->field_declineby,
			'flag_head_declinedate' => $this->field_declinedate,
			'flag_appr' => $this->approval_field_approve,
			'flag_decl' => $this->approval_field_decline,
			'appr_by' => $this->approval_field_approveby,
			'appr_date' => $this->approval_field_approvedate,
			'decl_by' => $this->approval_field_declineby,
			'decl_date' => $this->approval_field_declinedate,
			'notes' => $this->approval_field_notes,
			'approval_version' => $this->approval_field_version,
			'document_version' => $this->main_field_version
		];


		try {

			$useotp = property_exists($this, 'useotp') ? $this->useotp : true;
			if ($useotp) {
				$otp = \property_exists($param, 'otp') ?	$param->otp : '';
				$otpcode = \property_exists($param, 'otpcode') ? $param->otpcode : ''; 		
				try {
					OTP::Verify($this->db, $otp, $otpcode);
				} catch (\Exception $ex) {
					throw new WebException('OTP yang anda masukkan salah', 403);
				}
			}

			// $this->CURR = new Currency($this->db);
			$currentdata = (object)[
				'header' => $this->get_header_row($id),
				'user' => $userdata
			];

			$this->pre_action_check($currentdata, $param->approve ? 'approve' : 'decline');


			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {

				$ret = $this->approve($currentdata, $param);

				$record = []; $row = $this->get_header_row($id);
				foreach ($row as $key => $value) { $record[$key] = $value; }
				$dataresponse = (object) array_merge($record, [
					//  untuk lookup atau modify response ditaruh disini
					'unit_name' => \FGTA4\utils\SqlUtility::Lookup($record['unit_id'], $this->db, 'mst_unit', 'unit_id', 'unit_name'),
					'owner_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['owner_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
					'merchquotout_descr' => \FGTA4\utils\SqlUtility::Lookup($record['merchquotout_id'], $this->db, 'trn_merchquotout', 'merchquotout_id', 'merchquotout_descr'),
					'orderintype_name' => \FGTA4\utils\SqlUtility::Lookup($record['orderintype_id'], $this->db, 'mst_orderintype', 'orderintype_id', 'orderintype_name'),
					'merchorderin_dt' => date("d/m/Y", strtotime($record['merchorderin_dt'])),
					'merchorderin_dteta' => date("d/m/Y", strtotime($record['merchorderin_dteta'])),
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

					'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				]);


				
				if ( $param->approve) {
					if ($ret->isfinalapproval) {
						$this->MergeToOrderIn($id, $currentdata, $param); 
						\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $id, 'FINAL APPROVAL', $userdata->username, (object)[]);
					} else {
						\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $id, 'APPROVE', $userdata->username, (object)[]);
					}
				} else {
					\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $id, 'DECLINE', $userdata->username, (object)[]);
				}


				$this->db->commit();
				return (object)[
					'success' => true,
					'isfinalapproval' => $ret->isfinalapproval,
					'dataresponse' => $dataresponse
				];
				
			} catch (\Exception $ex) {
				$this->db->rollBack();
				throw $ex;
			} finally {
				$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,1);
			}	
			
		} catch (\Exception $ex) {
			throw $ex;
		}
	}



	public function approve($currentdata, $param) {
		try {
			StandartApproval::CheckAuthoriryToApprove($this->db, $param);	
			StandartApproval::CheckPendingApproval($this->db, $param);

			$ret = (object)['isfinalapproval'=>false];
			if ($param->approve) {
				// echo "approving...\r\n";
				$ret = StandartApproval::Approve($this->db, $param);
			} else {
				// echo "declining...\r\n";
				StandartApproval::Decline($this->db, $param);
			}

			return $ret;
		} catch (\Exception $ex) {
			throw $ex;
		}		
	}



	public function MergeToOrderIn($id, $currentdata, $param) {
		try {




			// hapus current data
			$this->db->query("delete from trn_orderinappr where orderin_id='$id'");
			$this->db->query("delete from trn_orderinterm where orderin_id='$id'");
			$this->db->query("delete from trn_orderinitem where orderin_id='$id'");
			$this->db->query("delete from trn_orderin where orderin_id='$id'");

			$this->MergeHeader($id, $currentdata, $param);
			$this->MergeItem($id, $currentdata, $param);
			$this->MergeTerm($id, $currentdata, $param);
			$this->MergeApproval($id, $currentdata, $param);
			






		} catch (\Exception $ex) {
			throw $ex;
		}		
	}



	function MergeHeader($id, $currentdata, $param) {
		try {

			$h = $currentdata->header;

			// add header
			$obj = new \stdClass;
			$obj->orderin_id = $h->merchorderin_id;
			$obj->unit_id = $h->unit_id;
			$obj->owner_dept_id = $h->owner_dept_id;
			$obj->orderintype_id = $h->orderintype_id;
			$obj->orderin_ref = $h->merchorderin_ref;
			$obj->orderin_descr = $h->merchorderin_descr;
			$obj->orderin_dtstart = $h->merchorderin_dt;
			$obj->orderin_dtend = $h->merchorderin_dt;
			$obj->orderin_dteta = $h->merchorderin_dteta;
			$obj->partner_id = $h->partner_id;
			$obj->dept_id = $h->dept_id;
			$obj->ae_empl_id = $h->ae_empl_id;
			$obj->trxmodel_id = $h->trxmodel_id;
			$obj->project_id = $h->project_id;
			$obj->orderin_ishasdp = $h->orderin_ishasdp;
			$obj->orderin_dpvalue = $h->orderin_dpvalue;

			$obj->ppn_taxtype_id = $h->ppn_taxtype_id;
			$obj->ppn_taxvalue = $h->ppn_taxvalue;
			$obj->ppn_include = $h->ppn_include;
			// $obj->pph_taxtype_id
			// $obj->pph_taxvalue
			$obj->arunbill_coa_id = $h->arunbill_coa_id;
			$obj->ar_coa_id = $h->ar_coa_id;
			$obj->dp_coa_id = $h->dp_coa_id;
			$obj->sales_coa_id = $h->sales_coa_id;
			$obj->salesdisc_coa_id = $h->salesdisc_coa_id;
			$obj->ppn_coa_id = $h->ppn_coa_id;
			$obj->ppnsubsidi_coa_id = $h->ppnsubsidi_coa_id;
			// $obj->pph_coa_id
			$obj->orderin_totalitem = $h->merchorderin_totalitem;
			$obj->orderin_totalqty = $h->merchorderin_totalqty;
			$obj->orderin_salesgross = $h->merchorderin_salesgross;
			$obj->orderin_discount = $h->merchorderin_discount;
			$obj->orderin_subtotal = $h->merchorderin_subtotal;
			$obj->orderin_pph = $h->merchorderin_pph;
			$obj->orderin_nett = $h->merchorderin_nett;
			$obj->orderin_ppn = $h->merchorderin_ppn;
			$obj->orderin_total = $h->merchorderin_total;
			$obj->orderin_totaladdcost = $h->merchorderin_totaladdcost;
			$obj->orderin_payment = $h->merchorderin_payment;
			$obj->doc_id = $h->doc_id;
			$obj->orderin_version = $h->merchorderin_version;
			$obj->orderin_iscommit = $h->merchorderin_iscommit;
			$obj->orderin_isapprovalprogress = $h->merchorderin_isapprovalprogress;
			$obj->orderin_isapproved = $h->merchorderin_isapproved;
			$obj->orderin_isdeclined = $h->merchorderin_isdeclined;
			$obj->orderin_commitby = $h->merchorderin_commitby;
			$obj->orderin_commitdate = $h->merchorderin_commitdate;
			$obj->orderin_approveby = $h->merchorderin_approveby;
			$obj->orderin_approvedate = $h->merchorderin_approvedate;
			$obj->orderin_isautogenerated = 1;
			$obj->_createby = $currentdata->user->username;
			$obj->_createdate = date("Y-m-d H:i:s");

			$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("trn_orderin", $obj);
			$stmt = $this->db->prepare($cmd->sql);
			$stmt->execute($cmd->params);


		} catch (\Exception $ex) {
			throw $ex;
		}
	}




	function MergeItem($id, $currentdata, $param) {
		try {

			$sql = "select * from trn_merchorderinitem where merchorderin_id = :id ";
			$stmt = $this->db->prepare($sql );
			$stmt->execute([':id' => $id]);
			$rows = $stmt->fetchall(\PDO::FETCH_ASSOC);

			foreach ($rows as $row) {
				$obj = new \stdClass;
				$obj->orderinitem_id = $row['merchorderinitem_id'];
				$obj->itemclass_id = $row['itemclass_id'];
				$obj->orderinitem_descr = $row['merchitem_name'];
				$obj->orderinitem_qty = $row['merchorderinitem_qty'];
				$obj->orderinitem_price = $row['merchorderinitem_price'];
				$obj->orderinitem_pricediscpercent = $row['merchorderinitem_pricediscpercent'];
				$obj->orderinitem_pricediscvalue = $row['merchorderinitem_pricediscvalue'];
				$obj->orderinitem_subtotal = $row['merchorderinitem_subtotal'];
				$obj->accbudget_id = $row['accbudget_id'];
				$obj->coa_id = $row['coa_id'];
				$obj->orderin_id = $row['merchorderin_id'];
				$obj->_createby = $currentdata->user->username;
				$obj->_createdate = date("Y-m-d H:i:s");


				$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("trn_orderinitem", $obj);
				$stmt = $this->db->prepare($cmd->sql);
				$stmt->execute($cmd->params);
			}


		} catch (\Exception $ex) {
			throw $ex;
		}
	}


	function MergeTerm($id, $currentdata, $param) {
		try {


			$sql = "select * from trn_merchorderinterm where merchorderin_id = :id ";
			$stmt = $this->db->prepare($sql );
			$stmt->execute([':id' => $id]);
			$rows = $stmt->fetchall(\PDO::FETCH_ASSOC);

			foreach ($rows as $row) {
				$obj = new \stdClass;
				$obj->orderinterm_id = $row['merchorderinterm_id'];
				$obj->orderintermtype_id = $row['orderintermtype_id'];
				$obj->orderinterm_descr = $row['merchorderinterm_descr'];
				$obj->orderinterm_days = $row['merchorderinterm_days'];
				$obj->orderinterm_dtfrometa = $row['merchorderinterm_dtfrometa'];
				$obj->orderinterm_dt = $row['merchorderinterm_dt'];
				$obj->orderinterm_isdp = $row['merchorderinterm_isdp'];
				$obj->orderinterm_paymentpercent = $row['merchorderinterm_paymentpercent'];
				$obj->orderinterm_payment = $row['merchorderinterm_payment'];
				$obj->orderin_totalpayment = $row['merchorderin_totalpayment'];
				$obj->orderin_id = $row['merchorderin_id'];
				$obj->_createby = $currentdata->user->username;
				$obj->_createdate = date("Y-m-d H:i:s");
				
				$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("trn_orderinterm", $obj);
				$stmt = $this->db->prepare($cmd->sql);
				$stmt->execute($cmd->params);
			}

		} catch (\Exception $ex) {
			throw $ex;
		}
	}



	function MergeApproval($id, $currentdata, $param) {
		try {
		
			$sql = "select * from trn_merchorderinappr where merchorderin_id = :id ";
			$stmt = $this->db->prepare($sql );
			$stmt->execute([':id' => $id]);
			$rows = $stmt->fetchall(\PDO::FETCH_ASSOC);	


			foreach ($rows as $row) {
				$obj = new \stdClass;
				$obj->orderinappr_id = $row['merchorderinappr_id'];	
				$obj->orderinappr_isapproved = $row['merchorderinappr_isapproved'];
				$obj->orderinappr_by = $row['merchorderinappr_by'];
				$obj->orderinappr_date = $row['merchorderinappr_date'];
				$obj->orderin_version = $row['merchorderin_version'];
				$obj->orderinappr_isdeclined = $row['merchorderinappr_isdeclined'];
				$obj->orderinappr_declinedby = $row['merchorderinappr_declinedby'];
				$obj->orderinappr_declineddate = $row['merchorderinappr_declineddate'];
				$obj->orderinappr_notes = $row['merchorderinappr_notes'];
				$obj->orderin_id = $row['merchorderin_id'];
				$obj->docauth_descr = $row['docauth_descr'];
				$obj->docauth_order = $row['docauth_order'];
				$obj->docauth_value = $row['docauth_value'];
				$obj->docauth_min = $row['docauth_min'];
				$obj->authlevel_id = $row['authlevel_id'];
				$obj->authlevel_name = $row['authlevel_name'];
				$obj->auth_id = $row['auth_id'];
				$obj->auth_name = $row['auth_name'];
				$obj->_createby = $currentdata->user->username;
				$obj->_createdate = date("Y-m-d H:i:s");

				$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("trn_orderinappr", $obj);
				$stmt = $this->db->prepare($cmd->sql);
				$stmt->execute($cmd->params);

			}

		} catch (\Exception $ex) {
			throw $ex;
		}
	}			


};


