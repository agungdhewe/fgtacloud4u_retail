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
 * retail/sales/merchquotout/apis/save.php
 *
 * ====
 * Save
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
	
	public function execute($data, $options) {
		$tablename = 'trn_merchquotout';
		$primarykey = 'merchquotout_id';
		$autoid = $options->autoid;
		$datastate = $data->_state;

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
			$obj->merchquotout_dt = (\DateTime::createFromFormat('d/m/Y',$obj->merchquotout_dt))->format('Y-m-d');
			$obj->merchquotout_dtvalid = (\DateTime::createFromFormat('d/m/Y',$obj->merchquotout_dtvalid))->format('Y-m-d');



			if ($obj->merchquotout_descr=='') { $obj->merchquotout_descr = '--NULL--'; }


			unset($obj->merchquotout_iscommit);
			unset($obj->merchquotout_isapprovalprogress);
			unset($obj->merchquotout_isapproved);
			unset($obj->merchquotout_isdeclined);
			unset($obj->merchquotout_commitby);
			unset($obj->merchquotout_commitdate);
			unset($obj->merchquotout_approveby);
			unset($obj->merchquotout_approvedate);
			unset($obj->merchquotout_declineby);
			unset($obj->merchquotout_declinedate);
			unset($obj->merchquotout_isclose);
			unset($obj->merchquotout_closeby);
			unset($obj->merchquotout_closedate);



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
					, 'merchquotout_id', 'unit_id', 'merchquotout_descr', 'merchquotout_dt', 'merchquotout_dtvalid', 'orderintype_id', 'partner_id', 'ae_empl_id', 'project_id', 'sales_dept_id', 'dept_id', 'orderin_ishasdp', 'orderin_dpvalue', 'ppn_taxtype_id', 'ppn_taxvalue', 'ppn_include', 'merchquotout_totalitem', 'merchquotout_totalqty', 'merchquotout_salesgross', 'merchquotout_discount', 'merchquotout_subtotal', 'merchquotout_nett', 'merchquotout_ppn', 'merchquotout_total', 'merchquotout_totaladdcost', 'merchquotout_payment', 'merchquotoutitem_estgp', 'merchquotoutitem_estgppercent', 'doc_id', 'merchquotout_version', 'merchquotout_iscommit', 'merchquotout_isapprovalprogress', 'merchquotout_isapproved', 'merchquotout_isdeclined', 'merchquotout_commitby', 'merchquotout_commitdate', 'merchquotout_approveby', 'merchquotout_approvedate', 'merchquotout_declineby', 'merchquotout_declinedate', 'merchquotout_isclose', 'merchquotout_closeby', 'merchquotout_closedate', '_createby', '_createdate', '_modifyby', '_modifydate'
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
					'merchquotout_dt' => date("d/m/Y", strtotime($row['merchquotout_dt'])),
					'merchquotout_dtvalid' => date("d/m/Y", strtotime($row['merchquotout_dtvalid'])),
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