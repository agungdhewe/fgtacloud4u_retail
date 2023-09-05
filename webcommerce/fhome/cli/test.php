<?php 

use PHPUnit\Framework\TestCase;


$_SERVER['PHP_SELF'] = __FILE__;
// if (!defined('__TESTING__')) {
// 	define('__TESTING__', 1);

// 	die();
// } 

class IniItu {
	function execute() {
		return "hasil";
	}
}

final class test extends TestCase {
	public function testExecute() : void {
		echo "test execute";
		$API = new IniItu();
		$res = $API->execute();
		$this->assertEquals('hasil', $res); 
	} 

	public function testKedua() : void {
		$API = new IniItu();
		$res = $API->execute();
		$this->assertEquals('hasil', $res); 
	} 
}


$command = new PHPUnit\TextUI\Command();
$command->run(array('',  $_SERVER['PHP_SELF']), true);


/*

Cara Panggil:
=============

./phpunit cli.php retail/webcommerce/home/test

*/