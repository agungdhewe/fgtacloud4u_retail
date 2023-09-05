<?php

require_once __ROOT_DIR.'/core/webapi.php';	
require_once __ROOT_DIR.'/core/webauth.php';	

class SCENARIO {
	public static $id;
	public static $username;
	public static $param;

	public static function Run() {
		require __DIR__ . '/../apis/xtion-approve-merge.php';
		SCENARIO::$id = 'SO21120006';
		
		
		SCENARIO::$username = '5effbb0a0f7d1';  // MANAGER
		// SCENARIO::$username = '5facb8a36127f';  // GM
		// SCENARIO::$username = '5facb8bebf826';  // DIREKTUR
		
		
		SCENARIO::$param = (object)[
			'approve' => true,
			'approval_note' => 'ok',
			'bypassauthority' => true
			
		];
		
		$API->reqinfo = (object)[
			'modulefullname' => 'retail/sales/merchorderin'
		];

		$API->auth = new class {
			public function session_get_user() {
				return (object) [
					'username' => SCENARIO::$username
				];
			}			
		};
		$API->useotp = false;
		$result = $API->execute(SCENARIO::$id, SCENARIO::$param);
	}
}


console::class(new class($args) extends clibase {
	function execute() {
		SCENARIO::Run();
	}
});
