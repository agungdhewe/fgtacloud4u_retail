var this_page_id;

import * as fgta4longtask from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4longtask.mjs'

const obj_txt_hemoving_id = $('#pnl_editimport-obj_txt_hemoving_id');
const taskSyncRV = fgta4longtask.init('#pnl_editimport-syncrv', {name: 'process-tbsyncrv'});
const btn_clear = $('#pnl_editimport-btn_clear');


export async function init(opt) {
	this_page_id = opt.id;

	// init sync RV
	((task)=>{
		task.onStarting = (task) => { taskSyncRV_starting(task); }
		task.onCanceled = (param) => { longtask_canceled(param); }
		task.onCompleted = (param) => { longtask_completed(param); }
		task.onError = (param) => { longtask_error(param); }
		if (task.getUserActiveTask()!=null) {
			task.MonitorProgress();
		}
	})(taskSyncRV);


		
	// event 
	btn_clear.linkbutton({
		onClick: () => { btn_clear_click() }
	})

	document.addEventListener('OnButtonBack', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
			$ui.getPages().show('pnl_edit')
		}
	})

	document.addEventListener('OnButtonHome', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
		}
	})

	document.addEventListener('OnSizeRecalculated', (ev) => {
		OnSizeRecalculated(ev.detail.width, ev.detail.height)
	})	
}


export function OnSizeRecalculated(width, height) {
}



export function OpenDetil(data) {
}


function btn_clear_click() {
	console.log('Clear PID');
	taskSyncRV.Clear();
}

function longtask_canceled(param) {
	$ui.ShowMessage("[WARNING]Task Canceled");
}

function longtask_completed(param) {
	$ui.ShowMessage("[INFO]Task Completed");
}

async function taskSyncRV_starting(task) {
	console.log('starting sync RV');

	var apiurl = `${global.modulefullname}/sync`;
	var args = {
		params: {
			taskname: task.taskname,
			synctype: 'RV',
			data: '',
		}
	};

	try {
		let result = await $ui.apicall(apiurl, args);
		console.log(result);
		if (result.error===true) {
			throw Error(result.errormessage);
		}

		var pid = result.pid;
		var log = result.log;
		task.setUserActiveTask(pid, {log:log});
		task.MonitorProgress();
	} catch (err) {
		console.error(err);
		task.Reset();
		longtask_error({message: err.message});
	}

}





/*
var this_page_id;

import * as fgta4longtask from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4longtask.mjs'


const obj_txt_hemoving_id = $('#pnl_editimport-obj_txt_hemoving_id');
const taskSyncRV = fgta4longtask.init('#pnl_editimport-syncrv', {name: 'process-tbsyncrv'});

const btn_clear = $('#pnl_editimport-btn_clear');


export async function init(opt) {
	this_page_id = opt.id
	

	// init sync RV
	((task)=>{
		task.onStarting = (task) => { taskSyncRV_starting(task); }
		task.onCanceled = (param) => { longtask_canceled(param); }
		task.onCompleted = (param) => { longtask_completed(param); }
		task.onError = (param) => { longtask_error(param); }
		if (task.getUserActiveTask()!=null) {
			task.MonitorProgress();
		}
	})(taskSyncRV);

	
	// event 
	btn_clear.linkbutton({
		onClick: () => { btn_clear_click() }
	})

	
	document.addEventListener('OnButtonBack', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
			$ui.getPages().show('pnl_edit')
		}
	})

	document.addEventListener('OnButtonHome', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
		}
	})

	document.addEventListener('OnSizeRecalculated', (ev) => {
		OnSizeRecalculated(ev.detail.width, ev.detail.height)
	})	
}


export function OnSizeRecalculated(width, height) {
}



export function OpenDetil(data) {
}


function btn_clear_click() {
	console.log('Clear PID');
	taskSyncRV.Clear();
}

function longtask_canceled(param) {
	$ui.ShowMessage("[WARNING]Task Canceled");
}

function longtask_completed(param) {
	$ui.ShowMessage("[INFO]Task Completed");
}

async function taskSyncRV_starting(task) {
	console.log('starting sync RV');

	var apiurl = `${global.modulefullname}/sync`;
	var args = {
		params: {
			taskname: task.taskname,
			synctype: 'RV',
			data: '',
		}
	};

	try {
		let result = await $ui.apicall(apiurl, args);
		console.log(result);
		if (result.error===true) {
			throw Error(result.errormessage);
		}

		var pid = result.pid;
		var log = result.log;
		task.setUserActiveTask(pid, {log:log});
		task.MonitorProgress();
	} catch (err) {
		console.error(err);
		task.Reset();
		longtask_error({message: err.message});
	}

}
*/