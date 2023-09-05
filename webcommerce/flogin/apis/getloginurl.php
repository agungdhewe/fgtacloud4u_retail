<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/rootdir/mpctest/mpcconnector.php';


use \TransFashion\MPC\MPCConnector;
use \FGTA4\exceptions\WebException;

$API = new class extends WebAPI {
	function __construct() {
	}
	
	public function execute($param) {

		$config = (object)[
			'ApplicationId' => $GLOBALS['MPC']['ApplicationId'],
			'ApplicationSecret' => $GLOBALS['MPC']['ApplicationSecret'],
			'PrivateKey' => $GLOBALS['MPC']['PrivateKey'],
		];

		$mpc = new MPCConnector($config);
		$loginurl = $mpc->RequestAuthenticationPage();

		$url_components = parse_url($loginurl);
		parse_str($url_components['fragment'], $params);
		$equipmentId = $params['equipmentId'];
	



		return [
			'url' => $loginurl,
			'equipmentId' => $equipmentId,
			'tokenid' =>  session_id()
		];

	}

};


