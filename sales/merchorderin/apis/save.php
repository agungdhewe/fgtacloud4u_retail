<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR . "/core/sequencer.php";
require_once __DIR__ . '/xapi.base.php';

if (is_file(__DIR__ .'/data-header-handler.php')) {
	require_once __DIR__ .'/data-header-handler.php';
}


use \FGTA4\exceptions\WebException;
use \FGTA4\utils\Sequencer;



/**
 * retail/sales/merchorderin/apis/save.php
 *
 * ====
 * Save
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
	
	public function execute($data, $options) {
		$tablename = 'trn_merchorderin';
		$primarykey = 'merchorderin_id';
		$autoid = $options->autoid;
		$datastate = $data->_state;

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
			if (!$this->RequestIsAllowedFor($this->reqinfo, "save", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			$result = new \stdClass; 
			
			$key = new \stdClass;
			$obj = new \stdClass;
			foreach ($data as $fieldname => $value) {
				if ($fieldname=='_state') { continue; }
				if ($fieldname==$primarykey) {
					$key->{$fieldname} = $value;
				}
				$obj->{$fieldname} = $value;
			}

			// apabila ada tanggal, ubah ke format sql sbb:
			// $obj->tanggal = (\DateTime::createFromFormat('d/m/Y',$obj->tanggal))->format('Y-m-d');
			$obj->merchorderin_dt = (\DateTime::createFromFormat('d/m/Y',$obj->merchorderin_dt))->format('Y-m-d');
			$obj->merchorderin_dteta = (\DateTime::createFromFormat('d/m/Y',$obj->merchorderin_dteta))->format('Y-m-d');



			if ($obj->merchorderin_ref=='') { $obj->merchorderin_ref = '--NULL--'; }
			if ($obj->merchorderin_descr=='') { $obj->merchorderin_descr = '--NULL--'; }


			unset($obj->merchorderin_iscommit);
			unset($obj->merchorderin_commitby);
			unset($obj->merchorderin_commitdate);
			unset($obj->merchorderin_isapprovalprogress);
			unset($obj->merchorderin_isapproved);
			unset($obj->merchorderin_isdeclined);
			unset($obj->merchorderin_approveby);
			unset($obj->merchorderin_approvedate);
			unset($obj->merchorderin_declineby);
			unset($obj->merchorderin_declinedate);
			unset($obj->merchorderin_isclose);
			unset($obj->merchorderin_closeby);
			unset($obj->merchorderin_closedate);



			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {

				$action = '';
				if ($datastate=='NEW') {
					$action = 'NEW';
					if ($autoid) {
						$obj->{$primarykey} = $this->NewId([]);
					}
					$obj->_createby = $userdata->username;
					$obj->_createdate = date("Y-m-d H:i:s");
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert($tablename, $obj);
				} else {
					$action = 'MODIFY';
					$obj->_modifyby = $userdata->username;
					$obj->_modifydate = date("Y-m-d H:i:s");				
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLUpdate($tablename, $obj, $key);
				}
	
				$stmt = $this->db->prepare($cmd->sql);
				$stmt->execute($cmd->params);

				\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $obj->{$primarykey}, $action, $userdata->username, (object)[]);




				// result
				$where = \FGTA4\utils\SqlUtility::BuildCriteria((object)[$primarykey=>$obj->{$primarykey}], [$primarykey=>"$primarykey=:$primarykey"]);
				$sql = \FGTA4\utils\SqlUtility::Select($tablename , [
					  $primarykey
					, 'merchorderin_id', 'unit_id', 'owner_dept_id', 'partner_id', 'merchquotout_id', 'orderin_isunreferenced', 'orderintype_id', 'merchorderin_ref', 'merchorderin_descr', 'merchorderin_dt', 'merchorderin_dteta', 'ae_empl_id', 'project_id', 'merchorderin_totalqty', 'merchorderin_total', 'orderin_ishasdp', 'orderin_dpvalue', 'ppn_taxtype_id', 'ppn_taxvalue', 'ppn_include', 'arunbill_coa_id', 'ar_coa_id', 'dp_coa_id', 'sales_coa_id', 'salesdisc_coa_id', 'ppn_coa_id', 'ppnsubsidi_coa_id', 'merchorderin_totalitem', 'merchorderin_salesgross', 'merchorderin_discount', 'merchorderin_subtotal', 'merchorderin_pph', 'merchorderin_nett', 'merchorderin_ppn', 'merchorderin_totaladdcost', 'merchorderin_payment', 'merchorderin_estgp', 'merchorderin_estgppercent', 'dept_id', 'trxmodel_id', 'doc_id', 'merchorderin_version', 'merchorderin_iscommit', 'merchorderin_commitby', 'merchorderin_commitdate', 'merchorderin_isapprovalprogress', 'merchorderin_isapproved', 'merchorderin_isdeclined', 'merchorderin_approveby', 'merchorderin_approvedate', 'merchorderin_declineby', 'merchorderin_declinedate', 'merchorderin_isclose', 'merchorderin_closeby', 'merchorderin_closedate', '_createby', '_createdate', '_modifyby', '_modifydate'
				], $where->sql);
				$stmt = $this->db->prepare($sql);
				$stmt->execute($where->params);
				$row  = $stmt->fetch(\PDO::FETCH_ASSOC);			

				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}
				$result->dataresponse = (object) array_merge($record, [
					//  untuk lookup atau modify response ditaruh disini
					'unit_name' => \FGTA4\utils\SqlUtility::Lookup($record['unit_id'], $this->db, 'mst_unit', 'unit_id', 'unit_name'),
					'owner_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['owner_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
					'merchquotout_descr' => \FGTA4\utils\SqlUtility::Lookup($record['merchquotout_id'], $this->db, 'trn_merchquotout', 'merchquotout_id', 'merchquotout_descr'),
					'orderintype_name' => \FGTA4\utils\SqlUtility::Lookup($record['orderintype_id'], $this->db, 'mst_orderintype', 'orderintype_id', 'orderintype_name'),
					'merchorderin_dt' => date("d/m/Y", strtotime($row['merchorderin_dt'])),
					'merchorderin_dteta' => date("d/m/Y", strtotime($row['merchorderin_dteta'])),
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

				if (is_object($hnd)) {
					if (method_exists(get_class($hnd), 'DataSavedSuccess')) {
						$hnd->DataSavedSuccess($result);
					}
				}

				$this->db->commit();
				return $result;

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

	public function NewId($param) {
		
			$seqname = 'SO';

			$dt = new \DateTime();	
			$ye = $dt->format("y");
			$mo = $dt->format("m");
			$seq = new Sequencer($this->db, 'seq_generalmonthly', $seqname, ['ye', 'mo']);
			$raw = $seq->getraw(['ye'=>$ye, 'mo'=> $mo]);
			$id = $seqname . $raw['ye'] . $raw['mo'] . str_pad($raw['lastnum'], 4, '0', STR_PAD_LEFT);
			return $id;		
			
	}

};