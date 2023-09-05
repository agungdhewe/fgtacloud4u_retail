<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';

// /* Enable Debugging */
// require_once __ROOT_DIR.'/core/debug.php';

use \FGTA4\exceptions\WebException;
// use \FGTA4\debug;




/**
 * retail/sales/merchorderin/apis/xapi.base.php
 *
 * merchorderinBase
 * Kelas dasar untuk keperluan-keperluan api
 * kelas ini harus di-inherit untuk semua api pada modul merchorderin
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 17/01/2022
 */
class merchorderinBase extends WebAPI {

	protected $main_tablename = "trn_merchorderin";
	protected $main_primarykey = "merchorderin_id";
	protected $main_field_version = "merchorderin_version";	
	
	protected $field_iscommit = "merchorderin_iscommit";
	protected $field_commitby = "merchorderin_commitby";
	protected $field_commitdate = "merchorderin_commitdate";		
			
	
	protected $fields_isapprovalprogress = "merchorderin_isapprovalprogress";			
	protected $field_isapprove = "merchorderin_isapproved";
	protected $field_approveby = "merchorderin_approveby";
	protected $field_approvedate = "merchorderin_approvedate";
	protected $field_isdecline = "merchorderin_isdeclined";
	protected $field_declineby = "merchorderin_declineby";
	protected $field_declinedate = "merchorderin_declinedate";

	protected $approval_tablename = "trn_merchorderinappr";
	protected $approval_primarykey = "merchorderinappr_id";
	protected $approval_field_approve = "merchorderinappr_isapproved";
	protected $approval_field_approveby = "merchorderinappr_by";
	protected $approval_field_approvedate = "merchorderinappr_date";
	protected $approval_field_decline = "merchorderinappr_isdeclined";
	protected $approval_field_declineby = "merchorderinappr_declinedby";
	protected $approval_field_declinedate = "merchorderinappr_declineddate";
	protected $approval_field_notes = "merchorderinappr_notes";
	protected $approval_field_version = "merchorderin_version";

			



	function __construct() {

		// $logfilepath = __LOCALDB_DIR . "/output//*merchorderin*/.txt";
		// debug::disable();
		// debug::start($logfilepath, "w");

		$DB_CONFIG = DB_CONFIG[$GLOBALS['MAINDB']];
		$DB_CONFIG['param'] = DB_CONFIG_PARAM[$GLOBALS['MAINDBTYPE']];		
		$this->db = new \PDO(
					$DB_CONFIG['DSN'], 
					$DB_CONFIG['user'], 
					$DB_CONFIG['pass'], 
					$DB_CONFIG['param']
		);

		
	}

	function pre_action_check($data, $action) {
		try {
			return true;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	public function get_header_row($id) {
		try {
			$sql = "
				select 
				A.*
				from 
				$this->main_tablename A 
				where 
				A.$this->main_primarykey = :id 
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([":id" => $id]);
			$rows = $stmt->fetchall(\PDO::FETCH_ASSOC);
			if (!count($rows)) { throw new \Exception("Data '$id' tidak ditemukan"); }
			return (object)$rows[0];
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

}