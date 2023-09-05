<?php namespace FGTA4\module; if (!defined('FGTA4')) { die('Forbiden'); } 

$MODULE = new class extends WebModule {
	function __construct() {
		$this->debugoutput = true;
		$this->CLUSTER_ID = $GLOBALS['CLUSTER_ID'];
		$DB_CONFIG = DB_CONFIG[$GLOBALS['MAINDB']];
		$DB_CONFIG['param'] = DB_CONFIG_PARAM[$GLOBALS['MAINDBTYPE']];
		$this->db = new \PDO(
					$DB_CONFIG['DSN'], 
					$DB_CONFIG['user'], 
					$DB_CONFIG['pass'], 
					$DB_CONFIG['param']
		);

	}	

	public function LoadPage() {
		$this->title = "Store Locator";
		$this->preloadsstyles = [
			// 'index.php/asset/retail/webcommerce/fstatic/pstorelocator.css'
		];


		$viepageall = __DIR__ . '/' . 'fstorelocator-'. strtolower($this->CLUSTER_ID) .'-all.phtml';
		$viewpagestore = __DIR__ . '/' . 'fstorelocator-'. strtolower($this->CLUSTER_ID) .'-store.phtml';

		$this->ViewPageAll = $viepageall; 
		$this->ViewPageStore = $viewpagestore;
		

		if (!array_key_exists('id', $_GET)) {
			$this->siteinfo = null;
		} else {
			$record = $this->getSiteInfo($_GET['id']);
			if ($record!=null) {
				$this->siteinfo = (object)[
					'name' => $record['site_name'],
					'site_address1' => $record['site_address1'],
					'site_address2' => $record['site_address2'],
					'site_address3' => $record['site_address3'],
					'site_phone' => $record['site_phone'],
					'site_contact' => $record['site_contact'],
					'site_geoloc' => $record['site_geoloc']
				];
			} else {
				$this->siteinfo = null;
			}
		}		

	}


	public function getCities() {
		try {
			$stmt = $this->db->prepare("select * from web_city where city_isdisabled=0 and cluster_id=:cluster_id order by city_order");
			$stmt->execute([':cluster_id'=>$this->CLUSTER_ID]);
			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);
			return $rows;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}


	public function getSites($city_id) {
		try {
			$stmt = $this->db->prepare("select * from web_site where site_isdisabled=0 and city_id=:city_id order by site_order");
			$stmt->execute([':city_id'=> $city_id]);
			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);
			return $rows;
		} catch (\Exception $ex) {
			throw $ex;
		}		
	}


	public function getSiteInfo($id) {
		try {
			$stmt = $this->db->prepare("select * from web_site where site_id=:site_id");
			$stmt->execute([':site_id'=> $id]);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			return $row;
		} catch (\Exception $ex) {
			throw $ex;
		}			
	}
};