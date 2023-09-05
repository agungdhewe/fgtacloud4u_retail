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
		$this->preloadsstyles = [
			'index.php/asset/retail/webcommerce/fhome/carousel.css'
		];

		$this->carousel = $this->getCurrentEditorial();
		$this->focus = $this->getCurrentFocus();
		$this->highlight = $this->getCurrentHightlight();
	

	}




	public function getCurrentEditorial($count=4) {
		try {
			$sql = "
				select 
				A.editorial_id, A.editorial_title, A.editorial_preface 
				from 
				web_editorial A inner join web_editorialtype B on B.editorialtype_id = A.editorialtype_id
				where
				A.cluster_id = :cluster_id
				and A.editorial_iscommit=1
				and A.editorial_isinhomecarousel = 1
				and A.editorial_datestart <= NOW()
				and ((A.editorial_dateend >= NOW() AND A.editorial_isdatelimit=1) OR A.editorial_isdatelimit=0)
				order by B.editorialtype_order, A.editorial_datestart desc, A._createdate desc  
				limit $count
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':cluster_id'=>$this->CLUSTER_ID]);
			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);

			$eds = [];
			foreach ($rows as $editorial) {
				$id = urlencode($editorial['editorial_id']);
				$eds[] = (object)[
					'editorial_id' => $editorial['editorial_id'],
					'editorial_title' => $editorial['editorial_title'],
					'editorial_preface' => $editorial['editorial_preface'],
					'editorial_imgsrc' => "index.php/cfs/{$id}",
					'editorial_link' => "index.php/module/retail/webcommerce/feditorial?id={$id}"
				];
			}
			return $eds;			
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	public function getCurrentFocus($count=1) {
		try {
			$sql = "
				select 
				A.editorial_id, A.editorial_title, A.editorial_preface 
				from 
				web_editorial A inner join web_editorialtype B on B.editorialtype_id = A.editorialtype_id
				where
				A.cluster_id = :cluster_id
				and A.editorial_iscommit=1
				and A.editorial_isinhomecarousel = 0
				and A.editorial_datestart <= NOW()
				and ((A.editorial_dateend >= NOW() AND A.editorial_isdatelimit=1) OR A.editorial_isdatelimit=0)
				and A.editorialtype_id = 'F'
				order by B.editorialtype_order, A.editorial_datestart desc, A._createdate desc  
				limit $count
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':cluster_id'=>$this->CLUSTER_ID]);
			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);

			$eds = [];
			foreach ($rows as $editorial) {
				$id = urlencode($editorial['editorial_id']);
				$eds[] = (object)[
					'editorial_id' => $editorial['editorial_id'],
					'editorial_title' => $editorial['editorial_title'],
					'editorial_preface' => $editorial['editorial_preface'],
					'editorial_imgsrc' => "index.php/cfs/{$id}",
					'editorial_link' => "index.php/module/retail/webcommerce/feditorial?id={$id}"
				];
			}
			return $eds;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	public function getCurrentHightlight($count=1) {
		try {
			$sql = "
				select 
				A.editorial_id, A.editorial_title, A.editorial_preface 
				from 
				web_editorial A inner join web_editorialtype B on B.editorialtype_id = A.editorialtype_id
				where
				A.cluster_id = :cluster_id
				and A.editorial_iscommit=1
				and A.editorial_isinhomecarousel = 0
				and A.editorial_datestart <= NOW()
				and ((A.editorial_dateend >= NOW() AND A.editorial_isdatelimit=1) OR A.editorial_isdatelimit=0)
				and A.editorialtype_id = 'H'
				order by B.editorialtype_order, A.editorial_datestart desc, A._createdate desc  
				limit $count
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':cluster_id'=>$this->CLUSTER_ID]);
			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);

			$eds = [];
			foreach ($rows as $editorial) {
				$id = urlencode($editorial['editorial_id']);
				$eds[] = (object)[
					'editorial_id' => $editorial['editorial_id'],
					'editorial_title' => $editorial['editorial_title'],
					'editorial_preface' => $editorial['editorial_preface'],
					'editorial_imgsrc' => "index.php/cfs/{$id}",
					'editorial_link' => "index.php/module/retail/webcommerce/feditorial?id={$id}"
				];
			}
			return $eds;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}




};