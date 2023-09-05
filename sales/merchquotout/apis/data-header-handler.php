<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}



class merchquotout_headerHandler extends WebAPI  {

	public function DataSavedSuccess($result) {

		$this->caller->log('save success');

	}
}