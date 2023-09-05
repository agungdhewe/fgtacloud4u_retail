var this_page_id;
var this_page_options;


import * as hnd from  './invsum-edit-hnd.mjs'


const btn_edit = $('#pnl_edit-btn_edit')
const btn_save = $('#pnl_edit-btn_save')
const btn_delete = $('#pnl_edit-btn_delete')






const pnl_form = $('#pnl_edit-form')
const obj = {
	txt_tbinvsum_id: $('#pnl_edit-txt_tbinvsum_id'),
	txt_block: $('#pnl_edit-txt_block'),
	dt_dt: $('#pnl_edit-dt_dt'),
	txt_region_id: $('#pnl_edit-txt_region_id'),
	txt_branch_id: $('#pnl_edit-txt_branch_id'),
	txt_heinv_id: $('#pnl_edit-txt_heinv_id'),
	txt_heinv_art: $('#pnl_edit-txt_heinv_art'),
	txt_heinv_mat: $('#pnl_edit-txt_heinv_mat'),
	txt_heinv_col: $('#pnl_edit-txt_heinv_col'),
	chk_heinv_iskonsinyasi: $('#pnl_edit-chk_heinv_iskonsinyasi'),
	txt_heinv_priceori: $('#pnl_edit-txt_heinv_priceori'),
	txt_heinv_priceadj: $('#pnl_edit-txt_heinv_priceadj'),
	txt_heinv_pricegross: $('#pnl_edit-txt_heinv_pricegross'),
	txt_heinv_price: $('#pnl_edit-txt_heinv_price'),
	txt_heinv_pricedisc: $('#pnl_edit-txt_heinv_pricedisc'),
	txt_heinv_pricenett: $('#pnl_edit-txt_heinv_pricenett'),
	txt_gtype: $('#pnl_edit-txt_gtype'),
	txt_season_group: $('#pnl_edit-txt_season_group'),
	txt_season_id: $('#pnl_edit-txt_season_id'),
	txt_rvid: $('#pnl_edit-txt_rvid'),
	dt_rvdt: $('#pnl_edit-dt_rvdt'),
	txt_rvqty: $('#pnl_edit-txt_rvqty'),
	txt_age: $('#pnl_edit-txt_age'),
	txt_heinvctg_id: $('#pnl_edit-txt_heinvctg_id'),
	txt_heinvctg_name: $('#pnl_edit-txt_heinvctg_name'),
	txt_heinvctg_class: $('#pnl_edit-txt_heinvctg_class'),
	txt_heinvctg_gender: $('#pnl_edit-txt_heinvctg_gender'),
	txt_heinvctg_sizetag: $('#pnl_edit-txt_heinvctg_sizetag'),
	txt_heinvgro_id: $('#pnl_edit-txt_heinvgro_id'),
	txt_heinv_group1: $('#pnl_edit-txt_heinv_group1'),
	txt_heinv_group2: $('#pnl_edit-txt_heinv_group2'),
	txt_heinv_gender: $('#pnl_edit-txt_heinv_gender'),
	txt_heinv_color1: $('#pnl_edit-txt_heinv_color1'),
	txt_heinv_color2: $('#pnl_edit-txt_heinv_color2'),
	txt_heinv_color3: $('#pnl_edit-txt_heinv_color3'),
	txt_heinv_hscode_ship: $('#pnl_edit-txt_heinv_hscode_ship'),
	txt_heinv_hscode_ina: $('#pnl_edit-txt_heinv_hscode_ina'),
	txt_heinv_plbname: $('#pnl_edit-txt_heinv_plbname'),
	txt_ref_id: $('#pnl_edit-txt_ref_id'),
	txt_invcls_id: $('#pnl_edit-txt_invcls_id'),
	chk_heinv_isweb: $('#pnl_edit-chk_heinv_isweb'),
	txt_heinv_weight: $('#pnl_edit-txt_heinv_weight'),
	txt_heinv_length: $('#pnl_edit-txt_heinv_length'),
	txt_heinv_width: $('#pnl_edit-txt_heinv_width'),
	txt_heinv_height: $('#pnl_edit-txt_heinv_height'),
	txt_heinv_webdescr: $('#pnl_edit-txt_heinv_webdescr'),
	txt_heinv_other1: $('#pnl_edit-txt_heinv_other1'),
	txt_heinv_other2: $('#pnl_edit-txt_heinv_other2'),
	txt_heinv_other3: $('#pnl_edit-txt_heinv_other3'),
	txt_heinv_other4: $('#pnl_edit-txt_heinv_other4'),
	txt_heinv_other5: $('#pnl_edit-txt_heinv_other5'),
	txt_heinv_produk: $('#pnl_edit-txt_heinv_produk'),
	txt_heinv_bahan: $('#pnl_edit-txt_heinv_bahan'),
	txt_heinv_pemeliharaan: $('#pnl_edit-txt_heinv_pemeliharaan'),
	txt_heinv_logo: $('#pnl_edit-txt_heinv_logo'),
	txt_heinv_dibuatdi: $('#pnl_edit-txt_heinv_dibuatdi'),
	txt_heinv_modifydate: $('#pnl_edit-txt_heinv_modifydate'),
	txt_lastcost: $('#pnl_edit-txt_lastcost'),
	txt_lastcostid: $('#pnl_edit-txt_lastcostid'),
	dt_lastcostdt: $('#pnl_edit-dt_lastcostdt'),
	txt_lastpriceid: $('#pnl_edit-txt_lastpriceid'),
	dt_lastpricedt: $('#pnl_edit-dt_lastpricedt'),
	txt_beg: $('#pnl_edit-txt_beg'),
	txt_rv: $('#pnl_edit-txt_rv'),
	txt_tin: $('#pnl_edit-txt_tin'),
	txt_tout: $('#pnl_edit-txt_tout'),
	txt_sl: $('#pnl_edit-txt_sl'),
	txt_do: $('#pnl_edit-txt_do'),
	txt_aj: $('#pnl_edit-txt_aj'),
	txt_end: $('#pnl_edit-txt_end'),
	txt_tts: $('#pnl_edit-txt_tts'),
	txt_C01: $('#pnl_edit-txt_C01'),
	txt_C02: $('#pnl_edit-txt_C02'),
	txt_C03: $('#pnl_edit-txt_C03'),
	txt_C04: $('#pnl_edit-txt_C04'),
	txt_C05: $('#pnl_edit-txt_C05'),
	txt_C06: $('#pnl_edit-txt_C06'),
	txt_C07: $('#pnl_edit-txt_C07'),
	txt_C08: $('#pnl_edit-txt_C08'),
	txt_C09: $('#pnl_edit-txt_C09'),
	txt_C10: $('#pnl_edit-txt_C10'),
	txt_C11: $('#pnl_edit-txt_C11'),
	txt_C12: $('#pnl_edit-txt_C12'),
	txt_C13: $('#pnl_edit-txt_C13'),
	txt_C14: $('#pnl_edit-txt_C14'),
	txt_C15: $('#pnl_edit-txt_C15'),
	txt_C16: $('#pnl_edit-txt_C16'),
	txt_C17: $('#pnl_edit-txt_C17'),
	txt_C18: $('#pnl_edit-txt_C18'),
	txt_C19: $('#pnl_edit-txt_C19'),
	txt_C20: $('#pnl_edit-txt_C20'),
	txt_C21: $('#pnl_edit-txt_C21'),
	txt_C22: $('#pnl_edit-txt_C22'),
	txt_C23: $('#pnl_edit-txt_C23'),
	txt_C24: $('#pnl_edit-txt_C24'),
	txt_C25: $('#pnl_edit-txt_C25')
}




let form;
let rowdata;

export async function init(opt) {
	this_page_id = opt.id;
	this_page_options = opt;


	var disableedit = false;
	// switch (this_page_options.variancename) {
	// 	case 'commit' :
	//		disableedit = true;
	//		btn_edit.linkbutton('disable');
	//		btn_save.linkbutton('disable');
	//		btn_delete.linkbutton('disable');
	//		break;
	// }


	form = new global.fgta4form(pnl_form, {
		primary: obj.txt_tbinvsum_id,
		autoid: false,
		logview: 'sync_tbinvsum',
		btn_edit: disableedit==true? $('<a>edit</a>') : btn_edit,
		btn_save: disableedit==true? $('<a>save</a>') : btn_save,
		btn_delete: disableedit==true? $('<a>delete</a>') : btn_delete,		
		objects : obj,
		OnDataSaving: async (data, options) => { await form_datasaving(data, options) },
		OnDataSaveError: async (data, options) => { await form_datasaveerror(data, options) },
		OnDataSaved: async (result, options) => {  await form_datasaved(result, options) },
		OnDataDeleting: async (data, options) => { await form_deleting(data, options) },
		OnDataDeleted: async (result, options) => { await form_deleted(result, options) },
		OnIdSetup : (options) => { form_idsetup(options) },
		OnViewModeChanged : (viewonly) => { form_viewmodechanged(viewonly) },
		OnRecordStatusCreated: () => {
			undefined			
		}		
	});
	form.getHeaderData = () => {
		return getHeaderData();
	}

	// Generator: Print Handler if exist
	// Generator: Commit Handler if exist
	// Generator: Approval Handler if exist
	// Generator: Xtion Handler if exist
	// Generator: Object Handler if exist

	// Generator: Upload Handler if exist






	document.addEventListener('keydown', (ev)=>{
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			if (ev.code=='KeyS' && ev.ctrlKey==true) {
				if (!form.isInViewMode()) {
					form.btn_save_click();
				}
				ev.stopPropagation()
				ev.preventDefault()
			}
		}
	}, true)
	
	document.addEventListener('OnSizeRecalculated', (ev) => {
		OnSizeRecalculated(ev.detail.width, ev.detail.height)
	})	

	document.addEventListener('OnButtonBack', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
			if (form.isDataChanged()) {
				form.canceledit(()=>{
					$ui.getPages().show('pnl_list', ()=>{
						form.setViewMode()
						$ui.getPages().ITEMS['pnl_list'].handler.scrolllast()
					})
				})
			} else {
				$ui.getPages().show('pnl_list', ()=>{
					form.setViewMode()
					$ui.getPages().ITEMS['pnl_list'].handler.scrolllast()
				})
			}
		
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

	//button state
	if (typeof hnd.init==='function') {
		hnd.init({
			form: form,
			obj: obj,
			opt: opt,
		})
	}

}

export function OnSizeRecalculated(width, height) {
}

export function getForm() {
	return form
}

export function getCurrentRowdata() {
	return rowdata;
}

export function open(data, rowid, viewmode=true, fn_callback) {

	rowdata = {
		data: data,
		rowid: rowid
	}

	var pOpt = form.getDefaultPrompt(false)
	var fn_dataopening = async (options) => {
		options.criteria[form.primary.mapping] = data[form.primary.mapping]
	}

	var fn_dataopened = async (result, options) => {
		var record = result.record;
		updatefilebox(record);

		/*

		*/
		for (var objid in obj) {
			let o = obj[objid]
			if (o.isCombo() && !o.isRequired()) {
				var value =  result.record[o.getFieldValueName()];
				if (value==null ) {
					record[o.getFieldValueName()] = pOpt.value;
					record[o.getFieldDisplayName()] = pOpt.text;
				}
			}
		}
  		updaterecordstatus(record)

		/* handle data saat opening data */   
		if (typeof hnd.form_dataopening == 'function') {
			hnd.form_dataopening(result, options);
		}


		form.SuspendEvent(true);
		form
			.fill(record)
			.setViewMode(viewmode)
			.lock(false)
			.rowid = rowid


		/* tambahkan event atau behaviour saat form dibuka
		   apabila ada rutin mengubah form dan tidak mau dijalankan pada saat opening,
		   cek dengan form.isEventSuspended()
		*/   
		if (typeof hnd.form_dataopened == 'function') {
			hnd.form_dataopened(result, options);
		}


		/* commit form */
		form.commit()
		form.SuspendEvent(false); 
		updatebuttonstate(record)


		/* update rowdata */
		for (var nv in rowdata.data) {
			if (record[nv]!=undefined) {
				rowdata.data[nv] = record[nv];
			}
		}

		// tampilkan form untuk data editor
		if (typeof fn_callback==='function') {
			fn_callback(null, rowdata.data);
		}
		
	}

	var fn_dataopenerror = (err) => {
		$ui.ShowMessage('[ERROR]'+err.errormessage);
	}

	form.dataload(fn_dataopening, fn_dataopened, fn_dataopenerror)
	
}


export function createnew() {
	form.createnew(async (data, options)=>{
		// console.log(data)
		// console.log(options)
		form.rowid = null

		// set nilai-nilai default untuk form
		data.dt = global.now()
		data.heinv_iskonsinyasi = '0'
		data.heinv_priceori = 0
		data.heinv_priceadj = 0
		data.heinv_pricegross = 0
		data.heinv_price = 0
		data.heinv_pricedisc = 0
		data.heinv_pricenett = 0
		data.rvdt = global.now()
		data.rvqty = 0
		data.age = 0
		data.heinv_isweb = '0'
		data.heinv_weight = 0
		data.heinv_length = 0
		data.heinv_width = 0
		data.heinv_height = 0
		data.lastcost = 0
		data.lastcostdt = global.now()
		data.lastpricedt = global.now()
		data.beg = 0
		data.rv = 0
		data.tin = 0
		data.tout = 0
		data.sl = 0
		data.do = 0
		data.aj = 0
		data.end = 0
		data.tts = 0
		data.C01 = 0
		data.C02 = 0
		data.C03 = 0
		data.C04 = 0
		data.C05 = 0
		data.C06 = 0
		data.C07 = 0
		data.C08 = 0
		data.C09 = 0
		data.C10 = 0
		data.C11 = 0
		data.C12 = 0
		data.C13 = 0
		data.C14 = 0
		data.C15 = 0
		data.C16 = 0
		data.C17 = 0
		data.C18 = 0
		data.C19 = 0
		data.C20 = 0
		data.C21 = 0
		data.C22 = 0
		data.C23 = 0
		data.C24 = 0
		data.C25 = 0


		if (typeof hnd.form_newdata == 'function') {
			// untuk mengambil nilai ui component,
			// di dalam handler form_newdata, gunakan perintah:
			// options.OnNewData = () => {
			// 		...
			// }		
			hnd.form_newdata(data, options);
		}




		options.OnCanceled = () => {
			$ui.getPages().show('pnl_list')
		}



	})
}


export function getHeaderData() {
	var header_data = form.getData();
	if (typeof hnd.form_getHeaderData == 'function') {
		hnd.form_getHeaderData(header_data);
	}
	return header_data;
}

export function detil_open(pnlname) {
	if (form.isDataChanged()) {
		$ui.ShowMessage('Simpan dulu perubahan datanya.')
		return;
	}

	//$ui.getPages().show(pnlname)
	let header_data = getHeaderData();
	if (typeof hnd.form_detil_opening == 'function') {
		hnd.form_detil_opening(pnlname, (cancel)=>{
			if (cancel===true) {
				return;
			}
			$ui.getPages().show(pnlname, () => {
				$ui.getPages().ITEMS[pnlname].handler.OpenDetil(header_data)
			})
		});
	} else {
		$ui.getPages().show(pnlname, () => {
			$ui.getPages().ITEMS[pnlname].handler.OpenDetil(header_data)
		})
	}

	
}


function updatefilebox(record) {
	// apabila ada keperluan untuk menampilkan data dari object storage


	if (typeof hnd.form_updatefilebox == 'function') {
		hnd.form_updatefilebox(record);
	}
}

function updaterecordstatus(record) {
	// apabila ada keperluan untuk update status record di sini


	if (typeof hnd.form_updaterecordstatus == 'function') {
		hnd.form_updaterecordstatus(record);
	}
}

function updatebuttonstate(record) {
	// apabila ada keperluan untuk update state action button di sini


	if (typeof hnd.form_updatebuttonstate == 'function') {
		hnd.form_updatebuttonstate(record);
	}
}

function updategridstate(record) {
	// apabila ada keperluan untuk update state grid list di sini


	if (typeof hnd.form_updategridstate == 'function') {
		hnd.form_updategridstate(record);
	}
}

function form_viewmodechanged(viewmode) {
	var OnViewModeChangedEvent = new CustomEvent('OnViewModeChanged', {detail: {}})
	$ui.triggerevent(OnViewModeChangedEvent, {
		viewmode: viewmode
	})
}

function form_idsetup(options) {
	var objid = obj.txt_tbinvsum_id
	switch (options.action) {
		case 'fill' :
			objid.textbox('disable') 
			break;

		case 'createnew' :
			// console.log('new')
			if (form.autoid) {
				objid.textbox('disable') 
				objid.textbox('setText', '[AUTO]') 
			} else {
				objid.textbox('enable') 
			}
			break;
			
		case 'save' :
			objid.textbox('disable') 
			break;	
	}
}


async function form_datasaving(data, options) {
	// cek dulu data yang akan disimpan,
	// apabila belum sesuai dengan yang diharuskan, batalkan penyimpanan
	//    options.cancel = true

	// Modifikasi object data, apabila ingin menambahkan variabel yang akan dikirim ke server
	// options.skipmappingresponse = [];
	options.skipmappingresponse = [];
	for (var objid in obj) {
		var o = obj[objid]
		if (o.isCombo() && !o.isRequired()) {
			var id = o.getFieldValueName()
			options.skipmappingresponse.push(id)
			// console.log(id)
		}
	}

	if (typeof hnd.form_datasaving == 'function') {
		hnd.form_datasaving(data, options);
	}

}

async function form_datasaveerror(err, options) {
	// apabila mau olah error messagenya
	// $ui.ShowMessage(err.errormessage)
	console.log(err)
	if (typeof hnd.form_datasaveerror == 'function') {
		hnd.form_datasaveerror(err, options);
	}
}


async function form_datasaved(result, options) {
	// Apabila tidak mau munculkan dialog
	// options.suppressdialog = true

	// Apabila ingin mengganti message Data Tersimpan
	// options.savedmessage = 'Data sudah disimpan cuy!'

	// if (form.isNewData()) {
	// 	console.log('masukan ke grid')
	// 	$ui.getPages().ITEMS['pnl_list'].handler.updategrid(form.getData())
	// } else {
	// 	console.log('update grid')
	// }


	var data = {}
	Object.assign(data, form.getData(), result.dataresponse)
	/*

	*/

	var pOpt = form.getDefaultPrompt(false)
	for (var objid in obj) {
		var o = obj[objid]
		if (o.isCombo() && !o.isRequired()) {
			var value =  result.dataresponse[o.getFieldValueName()];
			var text = result.dataresponse[o.getFieldDisplayName()];
			if (value==null ) {
				value = pOpt.value;
				text = pOpt.text;
			}
			form.setValue(o, value, text);
		}
	}
	form.rowid = $ui.getPages().ITEMS['pnl_list'].handler.updategrid(data, form.rowid)
	rowdata = {
		data: data,
		rowid: form.rowid
	}

	if (typeof hnd.form_datasaved == 'function') {
		hnd.form_datasaved(result, rowdata, options);
	}
}



async function form_deleting(data) {
	if (typeof hnd.form_deleting == 'function') {
		hnd.form_deleting(data);
	}
}

async function form_deleted(result, options) {
	$ui.getPages().show('pnl_list')
	$ui.getPages().ITEMS['pnl_list'].handler.removerow(form.rowid)

	if (typeof hnd.form_deleted == 'function') {
		hnd.form_deleted(result, options);
	}
}




