<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';
//require_once __ROOT_DIR . "/core/sequencer.php";


if (is_file(__DIR__ .'/data-items-handler.php')) {
	require_once __DIR__ .'/data-items-handler.php';
}



use \FGTA4\exceptions\WebException;
//use \FGTA4\utils\Sequencer;



/**
 * retail/sales/merchquotout/apis/items-save.php
 *
 * ==========
 * Detil-Save
 * ==========
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel items merchquotout (trn_merchquotout)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 04/01/2022
 */
$API = new class extends merchquotoutBase {
	
	public function execute($data, $options) {
		$tablename = 'trn_merchquotoutitem';
		$primarykey = 'merchquotoutitem_id';
		$autoid = $options->autoid;
		$datastate = $data->_state;

		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\merchquotout_itemsHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new merchquotout_itemsHandler($data, $options);
			$hnd->caller = $this;
			$hnd->db = $this->db;
			$hnd->auth = $this->auth;
			$hnd->reqinfo = $reqinfo->reqinfo;
		} else {
			$hnd = new \stdClass;
		}

		try {
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
			$obj->merchitem_saldodt = (\DateTime::createFromFormat('d/m/Y',$obj->merchitem_saldodt))->format('Y-m-d');
			$obj->merchitem_lastrvdt = (\DateTime::createFromFormat('d/m/Y',$obj->merchitem_lastrvdt))->format('Y-m-d');



			if ($obj->merchitem_art=='') { $obj->merchitem_art = '--NULL--'; }
			if ($obj->merchitem_mat=='') { $obj->merchitem_mat = '--NULL--'; }
			if ($obj->merchitem_col=='') { $obj->merchitem_col = '--NULL--'; }
			if ($obj->merchitem_size=='') { $obj->merchitem_size = '--NULL--'; }
			if ($obj->merchitem_name=='') { $obj->merchitem_name = '--NULL--'; }
			if ($obj->merchitem_lastrv=='') { $obj->merchitem_lastrv = '--NULL--'; }





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

				
				$header_table = 'trn_merchquotout';
				$header_primarykey = 'merchquotout_id';
				$sqlrec = "update $header_table set _modifyby = :user_id, _modifydate=NOW() where $header_primarykey = :$header_primarykey";
				$stmt = $this->db->prepare($sqlrec);
				$stmt->execute([
					":user_id" => $userdata->username,
					":$header_primarykey" => $obj->{$header_primarykey}
				]);

				\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $obj->{$primarykey}, $action, $userdata->username, (object)[]);
				\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $header_table, $obj->{$header_primarykey}, $action . "_DETIL", $userdata->username, (object)[]);




				// result
				$where = \FGTA4\utils\SqlUtility::BuildCriteria((object)[$primarykey=>$obj->{$primarykey}], [$primarykey=>"$primarykey=:$primarykey"]);
				$sql = \FGTA4\utils\SqlUtility::Select($tablename , [
					$primarykey
					, 'merchquotoutitem_id', 'merchitem_id', 'merchitem_art', 'merchitem_mat', 'merchitem_col', 'merchitem_size', 'merchitem_name', 'merchquotoutitem_qty', 'merchquotoutitem_price', 'merchquotoutitem_pricediscpercent', 'merchquotoutitem_isdiscvalue', 'merchquotoutitem_pricediscvalue', 'merchquotoutitem_subtotal', 'merchquotoutitem_estgp', 'merchquotoutitem_estgppercent', 'merchitemctg_id', 'merchsea_id', 'brand_id', 'itemclass_id', 'merchitem_picture', 'merchitem_priceori', 'merchitem_price', 'merchitem_pricediscpercent', 'merchitem_pricediscvalue', 'merchitem_cogs', 'merchitem_saldo', 'merchitem_saldodt', 'merchitem_lastrv', 'merchitem_lastrvdt', 'merchquotout_id', '_createby', '_createdate', '_modifyby', '_modifydate', '_createby', '_createdate', '_modifyby', '_modifydate'
				], $where->sql);
				$stmt = $this->db->prepare($sql);
				$stmt->execute($where->params);
				$row  = $stmt->fetch(\PDO::FETCH_ASSOC);			

				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}
				$result->dataresponse = (object) array_merge($record, [
					// untuk lookup atau modify response ditaruh disini
					'merchitem_name' => \FGTA4\utils\SqlUtility::Lookup($record['merchitem_id'], $this->db, 'mst_merchitem', 'merchitem_id', 'merchitem_name'),
					'merchitemctg_name' => \FGTA4\utils\SqlUtility::Lookup($record['merchitemctg_id'], $this->db, 'mst_merchitemctg', 'merchitemctg_id', 'merchitemctg_name'),
					'merchsea_name' => \FGTA4\utils\SqlUtility::Lookup($record['merchsea_id'], $this->db, 'mst_merchsea', 'merchsea_id', 'merchsea_name'),
					'brand_name' => \FGTA4\utils\SqlUtility::Lookup($record['brand_id'], $this->db, 'mst_brand', 'brand_id', 'brand_name'),
					'itemclass_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemclass_id'], $this->db, 'mst_itemclass', 'itemclass_id', 'itemclass_name'),
					'merchitem_saldodt' => date("d/m/Y", strtotime($row['merchitem_saldodt'])),
					'merchitem_lastrvdt' => date("d/m/Y", strtotime($row['merchitem_lastrvdt'])),

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
		//$dt = new \DateTime();	
		//$ye = $dt->format("y");
		//$mo = $dt->format("m");
		//$seq = new Sequencer($this->db, 'seq_generalmonthly', 'TF', ['ye', 'mo']);
		//$id = $seq->get(['ye'=>$ye, 'mo'=>$mo]);
		//return $id;		
		return uniqid();
	}

};