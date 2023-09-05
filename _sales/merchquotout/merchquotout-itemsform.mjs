var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'
import * as hnd from  './merchquotout-itemsform-hnd.mjs'

const reload_header_modified = true;


const txt_title = $('#pnl_edititemsform-title')
const btn_edit = $('#pnl_edititemsform-btn_edit')
const btn_save = $('#pnl_edititemsform-btn_save')
const btn_delete = $('#pnl_edititemsform-btn_delete')
const btn_prev = $('#pnl_edititemsform-btn_prev')
const btn_next = $('#pnl_edititemsform-btn_next')
const btn_addnew = $('#pnl_edititemsform-btn_addnew')
const chk_autoadd = $('#pnl_edititemsform-autoadd')


const pnl_form = $('#pnl_edititemsform-form')
const obj = {
	txt_merchquotoutitem_id: $('#pnl_edititemsform-txt_merchquotoutitem_id'),
	cbo_merchitem_id: $('#pnl_edititemsform-cbo_merchitem_id'),
	txt_merchitem_art: $('#pnl_edititemsform-txt_merchitem_art'),
	txt_merchitem_mat: $('#pnl_edititemsform-txt_merchitem_mat'),
	txt_merchitem_col: $('#pnl_edititemsform-txt_merchitem_col'),
	txt_merchitem_size: $('#pnl_edititemsform-txt_merchitem_size'),
	txt_merchitem_name: $('#pnl_edititemsform-txt_merchitem_name'),
	txt_merchquotoutitem_qty: $('#pnl_edititemsform-txt_merchquotoutitem_qty'),
	txt_merchquotoutitem_price: $('#pnl_edititemsform-txt_merchquotoutitem_price'),
	txt_merchquotoutitem_pricediscpercent: $('#pnl_edititemsform-txt_merchquotoutitem_pricediscpercent'),
	chk_merchquotoutitem_isdiscvalue: $('#pnl_edititemsform-chk_merchquotoutitem_isdiscvalue'),
	txt_merchquotoutitem_pricediscvalue: $('#pnl_edititemsform-txt_merchquotoutitem_pricediscvalue'),
	txt_merchquotoutitem_subtotal: $('#pnl_edititemsform-txt_merchquotoutitem_subtotal'),
	txt_merchquotoutitem_estgp: $('#pnl_edititemsform-txt_merchquotoutitem_estgp'),
	txt_merchquotoutitem_estgppercent: $('#pnl_edititemsform-txt_merchquotoutitem_estgppercent'),
	cbo_merchitemctg_id: $('#pnl_edititemsform-cbo_merchitemctg_id'),
	cbo_merchsea_id: $('#pnl_edititemsform-cbo_merchsea_id'),
	cbo_brand_id: $('#pnl_edititemsform-cbo_brand_id'),
	cbo_itemclass_id: $('#pnl_edititemsform-cbo_itemclass_id'),
	txt_merchitem_picture: $('#pnl_edititemsform-txt_merchitem_picture'),
	txt_merchitem_priceori: $('#pnl_edititemsform-txt_merchitem_priceori'),
	txt_merchitem_price: $('#pnl_edititemsform-txt_merchitem_price'),
	txt_merchitem_pricediscpercent: $('#pnl_edititemsform-txt_merchitem_pricediscpercent'),
	txt_merchitem_pricediscvalue: $('#pnl_edititemsform-txt_merchitem_pricediscvalue'),
	txt_merchitem_cogs: $('#pnl_edititemsform-txt_merchitem_cogs'),
	txt_merchitem_saldo: $('#pnl_edititemsform-txt_merchitem_saldo'),
	dt_merchitem_saldodt: $('#pnl_edititemsform-dt_merchitem_saldodt'),
	txt_merchitem_lastrv: $('#pnl_edititemsform-txt_merchitem_lastrv'),
	dt_merchitem_lastrvdt: $('#pnl_edititemsform-dt_merchitem_lastrvdt'),
	txt_merchquotout_id: $('#pnl_edititemsform-txt_merchquotout_id')
}


let form;
let header_data;



export async function init(opt) {
	this_page_id = opt.id
	this_page_options = opt;

	
	form = new global.fgta4form(pnl_form, {
		primary: obj.txt_merchquotoutitem_id,
		autoid: true,
		logview: 'trn_merchquotoutitem',
		btn_edit: btn_edit,
		btn_save: btn_save,
		btn_delete: btn_delete,		
		objects : obj,
		OnDataSaving: async (data, options) => { await form_datasaving(data, options) },
		OnDataSaved: async (result, options) => {  await form_datasaved(result, options) },
		OnDataDeleting: async (data, options) => { await form_deleting(data, options) },
		OnDataDeleted: async (result, options) => { await form_deleted(result, options) },
		OnIdSetup : (options) => { form_idsetup(options) },
		OnViewModeChanged : (viewonly) => { form_viewmodechanged(viewonly) }
	});
	form.getHeaderData = () => {
		return header_data;
	}	

	form.AllowAddRecord = true
	form.AllowRemoveRecord = true
	form.AllowEditRecord = true
	form.CreateRecordStatusPage(this_page_id)
	form.CreateLogPage(this_page_id)



	obj.txt_merchquotoutitem_qty.numberbox({onChange: (newvalue, oldvalue) => { 
		if (typeof hnd.merchquotoutitem_qty_changed==='function') {hnd.merchquotoutitem_qty_changed(newvalue, oldvalue)} 
	}});
	
	obj.txt_merchquotoutitem_price.numberbox({onChange: (newvalue, oldvalue) => { 
		if (typeof hnd.merchquotoutitem_price_changed==='function') {hnd.merchquotoutitem_price_changed(newvalue, oldvalue)} 
	}});
	
	obj.txt_merchquotoutitem_pricediscpercent.numberbox({onChange: (newvalue, oldvalue) => { 
		if (typeof hnd.merchquotoutitem_pricediscpercent_changed==='function') {hnd.merchquotoutitem_pricediscpercent_changed(newvalue, oldvalue)} 
	}});
	
	obj.chk_merchquotoutitem_isdiscvalue.checkbox({onChange: (newvalue, oldvalue) => { 
		if (typeof hnd.merchquotoutitem_isdiscvalue_changed==='function') {hnd.merchquotoutitem_isdiscvalue_changed(newvalue, oldvalue)} 
	}});
	
	obj.txt_merchquotoutitem_pricediscvalue.numberbox({onChange: (newvalue, oldvalue) => { 
		if (typeof hnd.merchquotoutitem_pricediscvalue_changed==='function') {hnd.merchquotoutitem_pricediscvalue_changed(newvalue, oldvalue)} 
	}});
	


	obj.cbo_merchitem_id.name = 'pnl_edititemsform-cbo_merchitem_id'		
	new fgta4slideselect(obj.cbo_merchitem_id, {
		title: 'Pilih merchitem_id',
		returnpage: this_page_id,
		api: $ui.apis.load_merchitem_id,
		fieldValue: 'merchitem_id',
		fieldValueMap: 'merchitem_id',
		fieldDisplay: 'merchitem_name',
		fields: [
			{mapping: 'merchitem_id', text: 'merchitem_id'},
			{mapping: 'merchitem_name', text: 'merchitem_name'},
		],
		OnDataLoading: (criteria, options) => {
			criteria.unit_id = header_data.unit_id;	
			if (typeof hnd.cbo_merchitem_id_dataloading === 'function') {
				hnd.cbo_merchitem_id_dataloading(criteria);
			}
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({merchitem_id:'--NULL--', merchitem_name:'NONE'});	
			if (typeof hnd.cbo_merchitem_id_dataloaded === 'function') {
				hnd.cbo_merchitem_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_merchitem_id_selected === 'function') {
					hnd.cbo_merchitem_id_selected(value, display, record, args);
				}
			}			
		}
	})				
			
	obj.cbo_merchitemctg_id.name = 'pnl_edititemsform-cbo_merchitemctg_id'		
	new fgta4slideselect(obj.cbo_merchitemctg_id, {
		title: 'Pilih merchitemctg_id',
		returnpage: this_page_id,
		api: $ui.apis.load_merchitemctg_id,
		fieldValue: 'merchitemctg_id',
		fieldValueMap: 'merchitemctg_id',
		fieldDisplay: 'merchitemctg_name',
		fields: [
			{mapping: 'merchitemctg_id', text: 'merchitemctg_id'},
			{mapping: 'merchitemctg_name', text: 'merchitemctg_name'},
		],
		OnDataLoading: (criteria, options) => {
				
			if (typeof hnd.cbo_merchitemctg_id_dataloading === 'function') {
				hnd.cbo_merchitemctg_id_dataloading(criteria);
			}
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({merchitemctg_id:'--NULL--', merchitemctg_name:'NONE'});	
			if (typeof hnd.cbo_merchitemctg_id_dataloaded === 'function') {
				hnd.cbo_merchitemctg_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_merchitemctg_id_selected === 'function') {
					hnd.cbo_merchitemctg_id_selected(value, display, record, args);
				}
			}			
		}
	})				
			
	obj.cbo_merchsea_id.name = 'pnl_edititemsform-cbo_merchsea_id'		
	new fgta4slideselect(obj.cbo_merchsea_id, {
		title: 'Pilih merchsea_id',
		returnpage: this_page_id,
		api: $ui.apis.load_merchsea_id,
		fieldValue: 'merchsea_id',
		fieldValueMap: 'merchsea_id',
		fieldDisplay: 'merchsea_name',
		fields: [
			{mapping: 'merchsea_id', text: 'merchsea_id'},
			{mapping: 'merchsea_name', text: 'merchsea_name'},
		],
		OnDataLoading: (criteria, options) => {
				
			if (typeof hnd.cbo_merchsea_id_dataloading === 'function') {
				hnd.cbo_merchsea_id_dataloading(criteria);
			}
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({merchsea_id:'--NULL--', merchsea_name:'NONE'});	
			if (typeof hnd.cbo_merchsea_id_dataloaded === 'function') {
				hnd.cbo_merchsea_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_merchsea_id_selected === 'function') {
					hnd.cbo_merchsea_id_selected(value, display, record, args);
				}
			}			
		}
	})				
			
	obj.cbo_brand_id.name = 'pnl_edititemsform-cbo_brand_id'		
	new fgta4slideselect(obj.cbo_brand_id, {
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
		OnDataLoading: (criteria, options) => {
				
			if (typeof hnd.cbo_brand_id_dataloading === 'function') {
				hnd.cbo_brand_id_dataloading(criteria);
			}
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({brand_id:'--NULL--', brand_name:'NONE'});	
			if (typeof hnd.cbo_brand_id_dataloaded === 'function') {
				hnd.cbo_brand_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_brand_id_selected === 'function') {
					hnd.cbo_brand_id_selected(value, display, record, args);
				}
			}			
		}
	})				
			
	obj.cbo_itemclass_id.name = 'pnl_edititemsform-cbo_itemclass_id'		
	new fgta4slideselect(obj.cbo_itemclass_id, {
		title: 'Pilih itemclass_id',
		returnpage: this_page_id,
		api: `${global.modulefullname}/list-get-itemclass`,
		fieldValue: 'itemclass_id',
		fieldValueMap: 'itemclass_id',
		fieldDisplay: 'itemclass_name',
		fields: [
			{mapping: 'itemclass_id', text: 'itemclass_id'},
			{mapping: 'itemclass_name', text: 'itemclass_name'},
		],
		OnDataLoading: (criteria, options) => {
				
			if (typeof hnd.cbo_itemclass_id_dataloading === 'function') {
				hnd.cbo_itemclass_id_dataloading(criteria);
			}
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({itemclass_id:'--NULL--', itemclass_name:'NONE'});	
			if (typeof hnd.cbo_itemclass_id_dataloaded === 'function') {
				hnd.cbo_itemclass_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_itemclass_id_selected === 'function') {
					hnd.cbo_itemclass_id_selected(value, display, record, args);
				}
			}			
		}
	})				
			


	btn_addnew.linkbutton({ onClick: () => { btn_addnew_click() }  })
	btn_prev.linkbutton({ onClick: () => { btn_prev_click() } })
	btn_next.linkbutton({ onClick: () => { btn_next_click() } })

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
	
	document.addEventListener('OnButtonBack', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
			if (form.isDataChanged()) {
				form.canceledit(()=>{
					$ui.getPages().show('pnl_edititemsgrid', ()=>{
						form.setViewMode()
						$ui.getPages().ITEMS['pnl_edititemsgrid'].handler.scrolllast()
					})					
				})
			} else {
				$ui.getPages().show('pnl_edititemsgrid', ()=>{
					form.setViewMode()
					$ui.getPages().ITEMS['pnl_edititemsgrid'].handler.scrolllast()
				})
			}
		
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
	
	
	document.addEventListener('OnViewModeChanged', (ev) => {
		if (ev.detail.viewmode===true) {
			form.lock(true)
			btn_addnew.allow = false
			btn_addnew.linkbutton('disable')
			chk_autoadd.attr("disabled", true);	
			chk_autoadd.prop("checked", false);			
		} else {
			form.lock(false)
			btn_addnew.allow = true
			btn_addnew.linkbutton('enable')
			chk_autoadd.removeAttr("disabled");
			chk_autoadd.prop("checked", false);
		}
	})

	if (typeof hnd.init==='function') {
		hnd.init({
			form: form,
			obj: obj,
			opt: opt
		})
	}

}


export function OnSizeRecalculated(width, height) {
}


export function getForm() {
	return form
}

export function open(data, rowid, hdata) {
	// console.log(header_data)
	txt_title.html(hdata.merchquotout_descr)
	header_data = hdata

	var pOpt = form.getDefaultPrompt(false)
	var fn_dataopening = async (options) => {
		options.api = `${global.modulefullname}/items-open`
		options.criteria[form.primary.mapping] = data[form.primary.mapping]
	}

	var fn_dataopened = async (result, options) => {
		var record = result.record;
		updatefilebox(result.record);
/*
		if (record.merchitem_id==null) { record.merchitem_id='--NULL--'; record.merchitem_name='NONE'; }
		if (record.merchitemctg_id==null) { record.merchitemctg_id='--NULL--'; record.merchitemctg_name='NONE'; }
		if (record.merchsea_id==null) { record.merchsea_id='--NULL--'; record.merchsea_name='NONE'; }
		if (record.brand_id==null) { record.brand_id='--NULL--'; record.brand_name='NONE'; }
		if (record.itemclass_id==null) { record.itemclass_id='--NULL--'; record.itemclass_name='NONE'; }

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
		form.SuspendEvent(true);
		form
			.fill(record)
			.setValue(obj.cbo_merchitem_id, record.merchitem_id, record.merchitem_name)
			.setValue(obj.cbo_merchitemctg_id, record.merchitemctg_id, record.merchitemctg_name)
			.setValue(obj.cbo_merchsea_id, record.merchsea_id, record.merchsea_name)
			.setValue(obj.cbo_brand_id, record.brand_id, record.brand_name)
			.setValue(obj.cbo_itemclass_id, record.itemclass_id, record.itemclass_name)
			.setViewMode()
			.rowid = rowid



		/* tambahkan event atau behaviour saat form dibuka
		   apabila ada rutin mengubah form dan tidak mau dijalankan pada saat opening,
		   cek dengan form.isEventSuspended()
		*/ 
		if (typeof hnd.form_dataopened == 'function') {
			hnd.form_dataopened(result, options);
		}


		form.commit()
		form.SuspendEvent(false);


		// Editable
		if (form.AllowEditRecord!=true) {
			btn_edit.hide();
			btn_save.hide();
			btn_delete.hide();
		}
		

		// tambah baris
		if (form.AllowAddRecord) {
			btn_addnew.show()
		} else {
			btn_addnew.hide()
		}	

		// hapus baris
		if (form.AllowRemoveRecord) {
			btn_delete.show()
		} else {
			btn_delete.hide()
		}

		var prevnode = $(`#${rowid}`).prev()
		if (prevnode.length>0) {
			btn_prev.linkbutton('enable')
		} else {
			btn_prev.linkbutton('disable')
		}

		var nextode = $(`#${rowid}`).next()
		if (nextode.length>0) {
			btn_next.linkbutton('enable')
		} else {
			btn_next.linkbutton('disable')
		}		
	}

	var fn_dataopenerror = (err) => {
		$ui.ShowMessage('[ERROR]'+err.errormessage);
	}

	form.dataload(fn_dataopening, fn_dataopened, fn_dataopenerror)	
}

export function createnew(hdata) {
	header_data = hdata

	txt_title.html('Create New Row')
	form.createnew(async (data, options)=>{
		data.merchquotout_id= hdata.merchquotout_id
		data.items_value = 0

		data.merchquotoutitem_qty = 0
		data.merchquotoutitem_price = 0
		data.merchquotoutitem_pricediscpercent = 0
		data.merchquotoutitem_pricediscvalue = 0
		data.merchquotoutitem_subtotal = 0
		data.merchquotoutitem_estgp = 0
		data.merchquotoutitem_estgppercent = 0
		data.merchitem_priceori = 0
		data.merchitem_price = 0
		data.merchitem_pricediscpercent = 0
		data.merchitem_pricediscvalue = 0
		data.merchitem_cogs = 0
		data.merchitem_saldo = 0
		data.merchitem_saldodt = global.now()
		data.merchitem_lastrvdt = global.now()

		data.merchitem_id = '--NULL--'
		data.merchitem_name = 'NONE'
		data.merchitemctg_id = '--NULL--'
		data.merchitemctg_name = 'NONE'
		data.merchsea_id = '--NULL--'
		data.merchsea_name = 'NONE'
		data.brand_id = '--NULL--'
		data.brand_name = 'NONE'
		data.itemclass_id = '--NULL--'
		data.itemclass_name = 'NONE'

		if (typeof hnd.form_newdata == 'function') {
			hnd.form_newdata(data, options);
		}


		form.rowid = null
		options.OnCanceled = () => {
			$ui.getPages().show('pnl_edititemsgrid')
		}
	})
}


async function form_datasaving(data, options) {
	options.api = `${global.modulefullname}/items-save`

	// options.skipmappingresponse = ['merchitem_id', 'merchitemctg_id', 'merchsea_id', 'brand_id', 'itemclass_id', ];
	options.skipmappingresponse = [];
	for (var objid in obj) {
		var o = obj[objid]
		if (o.isCombo() && !o.isRequired()) {
			var id = o.getFieldValueName()
			options.skipmappingresponse.push(id)
			console.log(id)
		}
	}

	if (typeof hnd.form_datasaving == 'function') {
		hnd.form_datasaving(data, options);
	}	
}

async function form_datasaved(result, options) {
	var data = {}
	Object.assign(data, form.getData(), result.dataresponse)

	/*
	form.setValue(obj.cbo_merchitem_id, result.dataresponse.merchitem_name!=='--NULL--' ? result.dataresponse.merchitem_id : '--NULL--', result.dataresponse.merchitem_name!=='--NULL--'?result.dataresponse.merchitem_name:'NONE')
	form.setValue(obj.cbo_merchitemctg_id, result.dataresponse.merchitemctg_name!=='--NULL--' ? result.dataresponse.merchitemctg_id : '--NULL--', result.dataresponse.merchitemctg_name!=='--NULL--'?result.dataresponse.merchitemctg_name:'NONE')
	form.setValue(obj.cbo_merchsea_id, result.dataresponse.merchsea_name!=='--NULL--' ? result.dataresponse.merchsea_id : '--NULL--', result.dataresponse.merchsea_name!=='--NULL--'?result.dataresponse.merchsea_name:'NONE')
	form.setValue(obj.cbo_brand_id, result.dataresponse.brand_name!=='--NULL--' ? result.dataresponse.brand_id : '--NULL--', result.dataresponse.brand_name!=='--NULL--'?result.dataresponse.brand_name:'NONE')
	form.setValue(obj.cbo_itemclass_id, result.dataresponse.itemclass_name!=='--NULL--' ? result.dataresponse.itemclass_id : '--NULL--', result.dataresponse.itemclass_name!=='--NULL--'?result.dataresponse.itemclass_name:'NONE')

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
	form.rowid = $ui.getPages().ITEMS['pnl_edititemsgrid'].handler.updategrid(data, form.rowid)

	var autoadd = chk_autoadd.prop("checked")
	if (autoadd) {
		setTimeout(()=>{
			btn_addnew_click()
		}, 1000)
	}

	if (reload_header_modified) {
		var currentRowdata =  $ui.getPages().ITEMS['pnl_edit'].handler.getCurrentRowdata();
		$ui.getPages().ITEMS['pnl_edit'].handler.open(currentRowdata.data, currentRowdata.rowid, false, (err, data)=>{
			$ui.getPages().ITEMS['pnl_list'].handler.updategrid(data, currentRowdata.rowid);
		});	
	}

	if (typeof hnd.form_datasaved == 'function') {
		hnd.form_datasaved(result, rowdata, options);
	}

}

async function form_deleting(data, options) {
	options.api = `${global.modulefullname}/items-delete`
	if (typeof hnd.form_deleting == 'function') {
		hnd.form_deleting(data);
	}
}

async function form_deleted(result, options) {
	options.suppressdialog = true
	$ui.getPages().show('pnl_edititemsgrid', ()=>{
		$ui.getPages().ITEMS['pnl_edititemsgrid'].handler.removerow(form.rowid)
	});

	if (reload_header_modified) {
		var currentRowdata =  $ui.getPages().ITEMS['pnl_edit'].handler.getCurrentRowdata();
		$ui.getPages().ITEMS['pnl_edit'].handler.open(currentRowdata.data, currentRowdata.rowid, false, (err, data)=>{
			$ui.getPages().ITEMS['pnl_list'].handler.updategrid(data, currentRowdata.rowid);
		});	
	}

	if (typeof hnd.form_deleted == 'function') {
		hnd.form_deleted(result, options);
	}
	
}

function updatefilebox(record) {
	// apabila ada keperluan untuk menampilkan data dari object storage

}

function form_viewmodechanged(viewonly) {
	if (viewonly) {
		btn_prev.linkbutton('enable')
		btn_next.linkbutton('enable')
		if (btn_addnew.allow) {
			btn_addnew.linkbutton('enable')
		} else {
			btn_addnew.linkbutton('disable')
		}
	} else {
		btn_prev.linkbutton('disable')
		btn_next.linkbutton('disable')
		btn_addnew.linkbutton('disable')
	}
}


function form_idsetup(options) {
	var objid = obj.txt_merchquotoutitem_id
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

function btn_addnew_click() {
	createnew(header_data)
}


function btn_prev_click() {
	var prevode = $(`#${form.rowid}`).prev()
	if (prevode.length==0) {
		return
	} 
	
	var trid = prevode.attr('id')
	var dataid = prevode.attr('dataid')
	var record = $ui.getPages().ITEMS['pnl_edititemsgrid'].handler.getGrid().DATA[dataid]

	open(record, trid, header_data)
}

function btn_next_click() {
	var nextode = $(`#${form.rowid}`).next()
	if (nextode.length==0) {
		return
	} 

	var trid = nextode.attr('id')
	var dataid = nextode.attr('dataid')
	var record = $ui.getPages().ITEMS['pnl_edititemsgrid'].handler.getGrid().DATA[dataid]

	open(record, trid, header_data)
}