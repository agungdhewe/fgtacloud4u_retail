<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;

/**
 * retail/webcommerce/webmerchraw/apis/list.php
 *
 * ========
 * DataList
 * ========
 * Menampilkan data-data pada tabel header webmerchraw (web_merchraw)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 23/06/2021
 */
$API = new class extends webmerchrawBase {

	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		try {
		
			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "list", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}


			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"search" => " A.merch_id LIKE CONCAT('%', :search, '%') OR A.merch_name LIKE CONCAT('%', :search, '%') "
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("select count(*) as n from web_merchraw A" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
				select 
				merchraw_id, merchraw_name, merchraw_gender, merchraw_catcode, merchraw_catname, merchraw_line, merchraw_style, merchraw_stylename, merchraw_tipologymacro, merchraw_tipology, merchraw_weightgross, merchraw_weightnett, merchraw_sku, merchraw_skutype, merchraw_serial1, merchraw_serial2, merchraw_colcode, merchraw_colname, merchraw_colnameshort, merchraw_matcode, merchraw_matname, merchraw_matnameshort, merchraw_matcmpst, merchraw_liningcmpst, merchraw_solcmpst1, merchraw_solcmpst2, merchraw_madein, merchraw_widthgroup, merchraw_size, merchraw_dim, merchraw_dimgroup, merchraw_dimlength, merchraw_dimwidth, merchraw_dimheight, merchraw_barcode, brand_id, _createby, _createdate, _modifyby, _modifydate 
				from web_merchraw A
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
					'brand_name' => \FGTA4\utils\SqlUtility::Lookup($record['brand_id'], $this->db, 'web_brand', 'brand_id', 'brand_name'),
					 
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