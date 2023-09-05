var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'


const tbl_list = $('#pnl_list-tbl_list')

const txt_search = $('#pnl_list-txt_search')
const btn_load = $('#pnl_list-btn_load')
const btn_new = $('#pnl_list-btn_new')


const cbo_brand_id = $('#pnl_upload-cbo_brand_id');
const cbo_merchformat_id = $('#pnl_upload-cbo_merchformat_id');
const cbo_sea_id = $('#pnl_upload-cbo_sea_id');
const obj_pastebox = $('#pnl_upload-obj_pastebox');
const obj_pastewait = $('#pnl_upload-obj_pastewait');

let grd_list = {}

let last_scrolltop = 0

export async function init(opt) {
	this_page_id = opt.id;
	this_page_options = opt;


	cbo_brand_id.name = 'pnl_upload-cbo_brand_id';
	new fgta4slideselect(cbo_brand_id, {
		title: 'Pilih brand_id',
		returnpage: this_page_id,
		api: $ui.apis.load_brand_id,
		fieldValue: 'brand_id',
		fieldValueMap: 'brand_id',
		fieldDisplay: 'brand_name',
		fields: [
			{mapping: 'brand_id', text: 'brand_id'},
			{mapping: 'brand_name', text: 'brand_name'},
		],
		OnCreated: () => {
			cbo_brand_id.combo('setValue', "0");
			cbo_brand_id.combo('setText', "-- PILIH --");
		},
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {},
		OnSelected: (value, display, record) => {}
	})

	cbo_merchformat_id.name = 'pnl_upload-cbo_merchformat_id';
	new fgta4slideselect(cbo_merchformat_id, {
		title: 'Pilih Format',
		returnpage: this_page_id,
		api: $ui.apis.load_merchformat_id,
		fieldValue: 'merchformat_id',
		fieldValueMap: 'merchformat_id',
		fieldDisplay: 'merchformat_name',
		fields: [
			{mapping: 'merchformat_id', text: 'merchformat_id'},
			{mapping: 'merchformat_name', text: 'merchformat_name'},
		],
		OnCreated: () => {
			cbo_merchformat_id.combo('setValue', "0");
			cbo_merchformat_id.combo('setText', "-- PILIH --");
		},
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {},
		OnSelected: (value, display, record) => {}
	})	

	cbo_sea_id.name = 'pnl_upload-cbo_sea_id';
	new fgta4slideselect(cbo_sea_id, {
		title: 'Pilih Season',
		returnpage: this_page_id,
		api: $ui.apis.load_sea_id,
		fieldValue: 'sea_id',
		fieldValueMap: 'sea_id',
		fieldDisplay: 'sea_name',
		fields: [
			{mapping: 'sea_id', text: 'sea_id'},
			{mapping: 'sea_name', text: 'sea_name'},
		],
		OnCreated: () => {
			cbo_sea_id.combo('setValue', "0");
			cbo_sea_id.combo('setText', "-- PILIH --");
		},
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {},
		OnSelected: (value, display, record) => {}
	})	






	obj_pastebox[0].addEventListener('paste', (e) => {
		var clipboardData = e.clipboardData || window.clipboardData;
		var pastedData = clipboardData.getData('Text');

		obj_pastebox.hide();
		obj_pastewait.show();
		$ui.ShowMessage("[QUESTION]Apakah anda yakin akan <b>upload</b> data ?", {
			"OK": async () => {
				obj_pastebox.html('');
				obj_pastebox_paste(pastedData, (err)=>{
					obj_pastewait.hide();
					obj_pastebox.show();
				});
			},
			"Cancel": () => {
				obj_pastewait.hide();
				obj_pastebox.show();
				obj_pastebox.html('');
			}
		})

	});




	document.addEventListener('OnButtonBack', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
			$ui.getPages().show('pnl_list', ()=>{
				$ui.getPages().ITEMS['pnl_list'].handler.scrolllast()
			})
		}
	})

	document.addEventListener('OnButtonHome', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			if (form.isDataChanged()) {
				ev.detail.cancel = true;
				$ui.ShowMessage('Anda masih dalam mode edit dengan pending data, silakan matikan mode edit untuk kembali ke halaman utama.')
			}
		}
	})	
}




async function obj_pastebox_paste(pastedData, fn_finish) {
	var args = {
		pastedData: pastedData,
		brand_id: cbo_brand_id.combo('getValue'),
		sea_id: cbo_sea_id.combo('getValue')
	}

	try {
		$ui.mask('wait..');
		var { doUpload } = await import('../../../../../index.php/asset/retail/webcommerce/webmerch/upload-format-frg01.mjs');
		await doUpload(args, (err, result) => {
			setTimeout(()=>{
				fn_finish();
			}, 1000);			
		});
	} catch (err) {
		console.error(err);
		setTimeout(()=>{
			fn_finish(err);
		}, 1000);	
		$ui.ShowMessage('[ERROR]' + err.message);
	} finally {
		$ui.unmask();
	}	

}
