<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;


/**
 * retail/webcommerce/webmerchraw/apis/open.php
 *
 * ====
 * Open
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header webmerchraw (web_merchraw)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 23/06/2021
 */
$API = new class extends webmerchrawBase {
	
	public function execute($options) {
		$tablename = 'web_merchraw';
		$primarykey = 'merchraw_id';
		$userdata = $this->auth->session_get_user();

		try {

			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "open", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			$result = new \stdClass; 
			
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"merchraw_id" => " merchraw_id = :merchraw_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('web_merchraw A', [
				'merchraw_id', 'merchraw_name', 'merchraw_gender', 'merchraw_catcode', 'merchraw_catname', 'merchraw_line', 'merchraw_style', 'merchraw_stylename', 'merchraw_tipologymacro', 'merchraw_tipology', 'merchraw_weightgross', 'merchraw_weightnett', 'merchraw_sku', 'merchraw_skutype', 'merchraw_serial1', 'merchraw_serial2', 'merchraw_colcode', 'merchraw_colname', 'merchraw_colnameshort', 'merchraw_matcode', 'merchraw_matname', 'merchraw_matnameshort', 'merchraw_matcmpst', 'merchraw_liningcmpst', 'merchraw_solcmpst1', 'merchraw_solcmpst2', 'merchraw_madein', 'merchraw_widthgroup', 'merchraw_size', 'merchraw_dim', 'merchraw_dimgroup', 'merchraw_dimlength', 'merchraw_dimwidth', 'merchraw_dimheight', 'merchraw_barcode', 'brand_id', '_createby', '_createdate', '_modifyby', '_modifydate'
				, '_createby', '_createdate', '_modifyby', '_modifydate' 
			], $where->sql);

			$stmt = $this->db->prepare($sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);

			$record = [];
			foreach ($row as $key => $value) {
				$record[$key] = $value;
			}



			$result->record = array_merge($record, [
				
				// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
				// 'tambahan' => 'dta',
				//'tanggal' => date("d/m/Y", strtotime($record['tanggal'])),
				//'gendername' => $record['gender']
				
				'brand_name' => \FGTA4\utils\SqlUtility::Lookup($record['brand_id'], $this->db, 'web_brand', 'brand_id', 'brand_name'),


				'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

			]);

			// $date = DateTime::createFromFormat('d/m/Y', "24/04/2012");
			// echo $date->format('Y-m-d');

			

			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};