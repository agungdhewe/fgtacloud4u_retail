<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;


/**
 * retail/webcommerce/webeditorial/apis/open.php
 *
 * ====
 * Open
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header webeditorial (web_editorial)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 31/03/2021
 */
$API = new class extends webeditorialBase {
	
	public function execute($options) {
		$tablename = 'web_editorial';
		$primarykey = 'editorial_id';
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
					"editorial_id" => " editorial_id = :editorial_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('web_editorial A', [
				'editorial_id', 'editorial_title', 'editorial_preface', 'editorial_datestart', 'editorial_dateend', 'editorial_isdatelimit', 
				'editorial_content', 'editorial_tags', 'editorial_keyword', 'editorial_picture', 'editorial_iscommit', 'editorial_commitby', 
				'editorial_commitdate', 'editorial_version', 'editorialtype_id', 'editorial_isinhomecarousel', 'cluster_id', 
				'_createby', '_createdate', '_modifyby', '_modifydate'
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
				'editorial_datestart' => date("d/m/Y", strtotime($record['editorial_datestart'])),
				'editorial_dateend' => date("d/m/Y", strtotime($record['editorial_dateend'])),
				
				// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
				// 'tambahan' => 'dta',
				//'tanggal' => date("d/m/Y", strtotime($record['tanggal'])),
				//'gendername' => $record['gender']
				
				'editorial_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['editorial_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'editorialtype_name' => \FGTA4\utils\SqlUtility::Lookup($record['editorialtype_id'], $this->db, 'web_editorialtype', 'editorialtype_id', 'editorialtype_name'),
				'cluster_name' => \FGTA4\utils\SqlUtility::Lookup($record['cluster_id'], $this->db, 'web_cluster', 'cluster_id', 'cluster_name'),


				'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

			]);

			// $date = DateTime::createFromFormat('d/m/Y', "24/04/2012");
			// echo $date->format('Y-m-d');

				try { $result->record['editorial_picture_doc'] = $this->cdb->getAttachment($result->record[$primarykey], 'filedata'); } catch (\Exception $ex) {}
			

			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};