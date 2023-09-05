<?php namespace FGTA4\module; if (!defined('FGTA4')) { die('Forbiden'); } 

require_once __ROOT_DIR . "/core/visitortracking.php";

use FGTA4\utils\VisitorTracking;

$MODULE = new class extends WebModule {
	public function LoadPage() {
		

		$this->title = "Contact Us";
		
		// $GLOBALS['ERR_HANDLER'] = function ($error) {
		// 	var_dump($error);
		// };
		// $this->visitor = new VisitorTracking($GLOBALS['ERR_HANDLER'], '110.136.12.161');
		
	}

	public function error($err) {
		var_dump($err);
	}

	public function DumpVisitor() {
		echo "<pre>";
		var_dump($this->visitor->__toArray());
		echo "</pre>";
	}

	
};