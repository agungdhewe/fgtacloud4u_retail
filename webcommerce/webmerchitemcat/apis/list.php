<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;

/**
 * retail/webcommerce/webmerchitemcat/apis/list.php
 *
 * ========
 * DataList
 * ========
 * Menampilkan data-data pada tabel header webmerchitemcat (web_merchitemcat)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 31/03/2021
 */
$API = new class extends webmerchitemcatBase {

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
					"search" => " A.merchitemcat_id LIKE CONCAT('%', :search, '%') OR A.merchitemcat_name LIKE CONCAT('%', :search, '%') ",
					"cluster_id" => " A.cluster_id = :cluster_id "
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("select count(*) as n from web_merchitemcat A" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
				select 
				merchitemcat_id, merchitemcat_name, merchitemcat_descr, merchitemgro_id, gender_id, cluster_id, _createby, _createdate, _modifyby, _modifydate 
				from web_merchitemcat A
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
					'merchitemgro_name' => \FGTA4\utils\SqlUtility::Lookup($record['merchitemgro_id'], $this->db, 'web_merchitemgro', 'merchitemgro_id', 'merchitemgro_name'),
					'gender_name' => \FGTA4\utils\SqlUtility::Lookup($record['gender_id'], $this->db, 'web_gender', 'gender_id', 'gender_name'),
					'cluster_name' => \FGTA4\utils\SqlUtility::Lookup($record['cluster_id'], $this->db, 'web_cluster', 'cluster_id', 'cluster_name'),
					 
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