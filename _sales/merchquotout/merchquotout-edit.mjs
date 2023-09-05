var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'
import * as hnd from  './merchquotout-edit-hnd.mjs'


const btn_edit = $('#pnl_edit-btn_edit')
const btn_save = $('#pnl_edit-btn_save')
const btn_delete = $('#pnl_edit-btn_delete')
const btn_print = $('#pnl_edit-btn_print');

const btn_commit = $('#pnl_edit-btn_commit')
const btn_uncommit = $('#pnl_edit-btn_uncommit')
			

const btn_approve = $('#pnl_edit-btn_approve')
const btn_decline = $('#pnl_edit-btn_decline')			
				



const pnl_form = $('#pnl_edit-form')
const obj = {
	txt_merchquotout_id: $('#pnl_edit-txt_merchquotout_id'),
	cbo_unit_id: $('#pnl_edit-cbo_unit_id'),
	txt_merchquotout_descr: $('#pnl_edit-txt_merchquotout_descr'),
	dt_merchquotout_dt: $('#pnl_edit-dt_merchquotout_dt'),
	dt_merchquotout_dtvalid: $('#pnl_edit-dt_merchquotout_dtvalid'),
	cbo_orderintype_id: $('#pnl_edit-cbo_orderintype_id'),
	cbo_partner_id: $('#pnl_edit-cbo_partner_id'),
	cbo_ae_empl_id: $('#pnl_edit-cbo_ae_empl_id'),
	cbo_project_id: $('#pnl_edit-cbo_project_id'),
	cbo_sales_dept_id: $('#pnl_edit-cbo_sales_dept_id'),
	cbo_dept_id: $('#pnl_edit-cbo_dept_id'),
	chk_orderin_ishasdp: $('#pnl_edit-chk_orderin_ishasdp'),
	txt_orderin_dpvalue: $('#pnl_edit-txt_orderin_dpvalue'),
	cbo_ppn_taxtype_id: $('#pnl_edit-cbo_ppn_taxtype_id'),
	txt_ppn_taxvalue: $('#pnl_edit-txt_ppn_taxvalue'),
	chk_ppn_include: $('#pnl_edit-chk_ppn_include'),
	txt_merchquotout_totalitem: $('#pnl_edit-txt_merchquotout_totalitem'),
	txt_merchquotout_totalqty: $('#pnl_edit-txt_merchquotout_totalqty'),
	txt_merchquotout_salesgross: $('#pnl_edit-txt_merchquotout_salesgross'),
	txt_merchquotout_discount: $('#pnl_edit-txt_merchquotout_discount'),
	txt_merchquotout_subtotal: $('#pnl_edit-txt_merchquotout_subtotal'),
	txt_merchquotout_nett: $('#pnl_edit-txt_merchquotout_nett'),
	txt_merchquotout_ppn: $('#pnl_edit-txt_merchquotout_ppn'),
	txt_merchquotout_total: $('#pnl_edit-txt_merchquotout_total'),
	txt_merchquotout_totaladdcost: $('#pnl_edit-txt_merchquotout_totaladdcost'),
	txt_merchquotout_payment: $('#pnl_edit-txt_merchquotout_payment'),
	txt_merchquotoutitem_estgp: $('#pnl_edit-txt_merchquotoutitem_estgp'),
	txt_merchquotoutitem_estgppercent: $('#pnl_edit-txt_merchquotoutitem_estgppercent'),
	cbo_doc_id: $('#pnl_edit-cbo_doc_id'),
	txt_merchquotout_version: $('#pnl_edit-txt_merchquotout_version'),
	chk_merchquotout_iscommit: $('#pnl_edit-chk_merchquotout_iscommit'),
	chk_merchquotout_isapprovalprogress: $('#pnl_edit-chk_merchquotout_isapprovalprogress'),
	chk_merchquotout_isapproved: $('#pnl_edit-chk_merchquotout_isapproved'),
	chk_merchquotout_isdeclined: $('#pnl_edit-chk_merchquotout_isdeclined'),
	txt_merchquotout_commitby: $('#pnl_edit-txt_merchquotout_commitby'),
	txt_merchquotout_commitdate: $('#pnl_edit-txt_merchquotout_commitdate'),
	txt_merchquotout_approveby: $('#pnl_edit-txt_merchquotout_approveby'),
	txt_merchquotout_approvedate: $('#pnl_edit-txt_merchquotout_approvedate'),
	txt_merchquotout_declineby: $('#pnl_edit-txt_merchquotout_declineby'),
	txt_merchquotout_declinedate: $('#pnl_edit-txt_merchquotout_declinedate'),
	chk_merchquotout_isclose: $('#pnl_edit-chk_merchquotout_isclose'),
	txt_merchquotout_closeby: $('#pnl_edit-txt_merchquotout_closeby'),
	txt_merchquotout_closedate: $('#pnl_edit-txt_merchquotout_closedate')
}


const rec_commitby = $('#pnl_edit_record-commitby');
const rec_commitdate = $('#pnl_edit_record-commitdate');		
		
const rec_approveby = $('#pnl_edit_record-approveby');
const rec_approvedate = $('#pnl_edit_record-approvedate');			
const rec_declineby = $('#pnl_edit_record-declineby');
const rec_declinedate = $('#pnl_edit_record-declinedate');			
			


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
		primary: obj.txt_merchquotout_id,
		autoid: true,
		logview: 'trn_merchquotout',
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
			
		$('#pnl_edit_record_custom').detach().appendTo("#pnl_edit_record");
		$('#pnl_edit_record_custom').show();		
					
		}		
	});
	form.getHeaderData = () => {
		return getHeaderData();
	}


	btn_print.linkbutton({ onClick: () => { btn_print_click(); } });	
	

	btn_commit.linkbutton({ onClick: () => { btn_action_click({ action: 'commit' }); } });
	btn_uncommit.linkbutton({ onClick: () => { btn_action_click({ action: 'uncommit' }); } });			
			

	btn_approve.linkbutton({ onClick: () => { btn_action_click({ action: 'approve' }); } });
	btn_decline.linkbutton({ onClick: () => {
		var id = 'pnl_edit-reason_' + Date.now().toString();
		$ui.ShowMessage(`
			<div style="display: block;  margin-bottom: 10px">
				<div style="font-weight: bold; margin-bottom: 10px">Reason</div>
				<div">
					<input id="${id}" class="easyui-textbox" style="width: 300px; height: 60px;" data-options="multiline: true">
				</div>
			</div>
		`, {
			'Decline': () => {
				var reason = $(`#${id}`).textbox('getValue');
				btn_action_click({ action: 'decline', reason: reason }); 
			},
			'Cancel': () => {
			} 
		}, ()=>{
			var obj_reason = $(`#${id}`);
			var txt = obj_reason.textbox('textbox');
			txt[0].maxLength = 255;
			txt[0].classList.add('declinereasonbox');
			txt[0].addEventListener('keyup', (ev)=>{
				if (ev.key=='Enter') {
					ev.stopPropagation();
				}
			});
			txt.css('text-align', 'center');
			txt.focus();
		})
	}});				
				






	new fgta4slideselect(obj.cbo_unit_id, {
		title: 'Pilih unit_id',
		returnpage: this_page_id,
		api: $ui.apis.load_unit_id,
		fieldValue: 'unit_id',
		fieldValueMap: 'unit_id',
		fieldDisplay: 'unit_name',
		fields: [
			{mapping: 'unit_id', text: 'unit_id'},
			{mapping: 'unit_name', text: 'unit_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_unit_id_dataloading === 'function') {
				hnd.cbo_unit_id_dataloading(criteria);
			}	
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({unit_id:'--NULL--', unit_name:'NONE'});	
			if (typeof hnd.cbo_unit_id_dataloaded === 'function') {
				hnd.cbo_unit_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_unit_id_selected === 'function') {
					hnd.cbo_unit_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_orderintype_id, {
		title: 'Pilih orderintype_id',
		returnpage: this_page_id,
		api: $ui.apis.load_orderintype_id,
		fieldValue: 'orderintype_id',
		fieldValueMap: 'orderintype_id',
		fieldDisplay: 'orderintype_name',
		fields: [
			{mapping: 'orderintype_id', text: 'orderintype_id'},
			{mapping: 'orderintype_name', text: 'orderintype_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_orderintype_id_dataloading === 'function') {
				hnd.cbo_orderintype_id_dataloading(criteria);
			}	
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({orderintype_id:'--NULL--', orderintype_name:'NONE'});	
			if (typeof hnd.cbo_orderintype_id_dataloaded === 'function') {
				hnd.cbo_orderintype_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
							console.log(record);
						
				if (typeof hnd.cbo_orderintype_id_selected === 'function') {
					hnd.cbo_orderintype_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_partner_id, {
		title: 'Pilih partner_id',
		returnpage: this_page_id,
		api: $ui.apis.load_partner_id,
		fieldValue: 'partner_id',
		fieldValueMap: 'partner_id',
		fieldDisplay: 'partner_name',
		fields: [
			{mapping: 'partner_id', text: 'partner_id'},
			{mapping: 'partner_name', text: 'partner_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_partner_id_dataloading === 'function') {
				hnd.cbo_partner_id_dataloading(criteria);
			}	
		},
		OnDataLoaded : (result, options) => {
				
			if (typeof hnd.cbo_partner_id_dataloaded === 'function') {
				hnd.cbo_partner_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_partner_id_selected === 'function') {
					hnd.cbo_partner_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_ae_empl_id, {
		title: 'Pilih ae_empl_id',
		returnpage: this_page_id,
		api: $ui.apis.load_ae_empl_id,
		fieldValue: 'ae_empl_id',
		fieldValueMap: 'empl_id',
		fieldDisplay: 'empl_name',
		fields: [
			{mapping: 'empl_id', text: 'empl_id'},
			{mapping: 'empl_name', text: 'empl_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_ae_empl_id_dataloading === 'function') {
				hnd.cbo_ae_empl_id_dataloading(criteria);
			}	
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({empl_id:'--NULL--', empl_name:'NONE'});	
			if (typeof hnd.cbo_ae_empl_id_dataloaded === 'function') {
				hnd.cbo_ae_empl_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_ae_empl_id_selected === 'function') {
					hnd.cbo_ae_empl_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_project_id, {
		title: 'Pilih project_id',
		returnpage: this_page_id,
		api: $ui.apis.load_project_id,
		fieldValue: 'project_id',
		fieldValueMap: 'project_id',
		fieldDisplay: 'project_name',
		fields: [
			{mapping: 'project_id', text: 'project_id'},
			{mapping: 'project_name', text: 'project_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_project_id_dataloading === 'function') {
				hnd.cbo_project_id_dataloading(criteria);
			}	
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({project_id:'--NULL--', project_name:'NONE'});	
			if (typeof hnd.cbo_project_id_dataloaded === 'function') {
				hnd.cbo_project_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_project_id_selected === 'function') {
					hnd.cbo_project_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_sales_dept_id, {
		title: 'Pilih sales_dept_id',
		returnpage: this_page_id,
		api: $ui.apis.load_sales_dept_id,
		fieldValue: 'sales_dept_id',
		fieldValueMap: 'dept_id',
		fieldDisplay: 'dept_name',
		fields: [
			{mapping: 'dept_id', text: 'dept_id'},
			{mapping: 'dept_name', text: 'dept_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_sales_dept_id_dataloading === 'function') {
				hnd.cbo_sales_dept_id_dataloading(criteria);
			}	
		},
		OnDataLoaded : (result, options) => {
				
			if (typeof hnd.cbo_sales_dept_id_dataloaded === 'function') {
				hnd.cbo_sales_dept_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_sales_dept_id_selected === 'function') {
					hnd.cbo_sales_dept_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_dept_id, {
		title: 'Pilih dept_id',
		returnpage: this_page_id,
		api: $ui.apis.load_dept_id,
		fieldValue: 'dept_id',
		fieldValueMap: 'dept_id',
		fieldDisplay: 'dept_name',
		fields: [
			{mapping: 'dept_id', text: 'dept_id'},
			{mapping: 'dept_name', text: 'dept_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_dept_id_dataloading === 'function') {
				hnd.cbo_dept_id_dataloading(criteria);
			}	
		},
		OnDataLoaded : (result, options) => {
				
			if (typeof hnd.cbo_dept_id_dataloaded === 'function') {
				hnd.cbo_dept_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_dept_id_selected === 'function') {
					hnd.cbo_dept_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_ppn_taxtype_id, {
		title: 'Pilih ppn_taxtype_id',
		returnpage: this_page_id,
		api: $ui.apis.load_ppn_taxtype_id,
		fieldValue: 'ppn_taxtype_id',
		fieldValueMap: 'taxtype_id',
		fieldDisplay: 'taxtype_name',
		fields: [
			{mapping: 'taxtype_id', text: 'taxtype_id'},
			{mapping: 'taxtype_name', text: 'taxtype_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_ppn_taxtype_id_dataloading === 'function') {
				hnd.cbo_ppn_taxtype_id_dataloading(criteria);
			}	
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({taxtype_id:'--NULL--', taxtype_name:'NONE'});	
			if (typeof hnd.cbo_ppn_taxtype_id_dataloaded === 'function') {
				hnd.cbo_ppn_taxtype_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_ppn_taxtype_id_selected === 'function') {
					hnd.cbo_ppn_taxtype_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_doc_id, {
		title: 'Pilih doc_id',
		returnpage: this_page_id,
		api: $ui.apis.load_doc_id,
		fieldValue: 'doc_id',
		fieldValueMap: 'doc_id',
		fieldDisplay: 'doc_name',
		fields: [
			{mapping: 'doc_id', text: 'doc_id'},
			{mapping: 'doc_name', text: 'doc_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_doc_id_dataloading === 'function') {
				hnd.cbo_doc_id_dataloading(criteria);
			}	
		},
		OnDataLoaded : (result, options) => {
				
			if (typeof hnd.cbo_doc_id_dataloaded === 'function') {
				hnd.cbo_doc_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_doc_id_selected === 'function') {
					hnd.cbo_doc_id_selected(value, display, record, args);
				}
			}
		}
	})				
				




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
		if (result.record.unit_id==null) { result.record.unit_id='--NULL--'; result.record.unit_name='NONE'; }
		if (result.record.orderintype_id==null) { result.record.orderintype_id='--NULL--'; result.record.orderintype_name='NONE'; }
		if (result.record.ae_empl_id==null) { result.record.ae_empl_id='--NULL--'; result.record.ae_empl_name='NONE'; }
		if (result.record.project_id==null) { result.record.project_id='--NULL--'; result.record.project_name='NONE'; }
		if (result.record.ppn_taxtype_id==null) { result.record.ppn_taxtype_id='--NULL--'; result.record.ppn_taxtype_name='NONE'; }

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

		form.SuspendEvent(true);
		form
			.fill(record)
			.setValue(obj.cbo_unit_id, record.unit_id, record.unit_name)
			.setValue(obj.cbo_orderintype_id, record.orderintype_id, record.orderintype_name)
			.setValue(obj.cbo_partner_id, record.partner_id, record.partner_name)
			.setValue(obj.cbo_ae_empl_id, record.ae_empl_id, record.ae_empl_name)
			.setValue(obj.cbo_project_id, record.project_id, record.project_name)
			.setValue(obj.cbo_sales_dept_id, record.sales_dept_id, record.sales_dept_name)
			.setValue(obj.cbo_dept_id, record.dept_id, record.sales_dept_name)
			.setValue(obj.cbo_ppn_taxtype_id, record.ppn_taxtype_id, record.ppn_taxtype_name)
			.setValue(obj.cbo_doc_id, record.doc_id, record.doc_name)
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
		data.merchquotout_dt = global.now()
		data.merchquotout_dtvalid = global.now()
		data.orderin_ishasdp = '0'
		data.orderin_dpvalue = 0
		data.ppn_taxvalue = 0
		data.ppn_include = '0'
		data.merchquotout_totalitem = 0
		data.merchquotout_totalqty = 0
		data.merchquotout_salesgross = 0
		data.merchquotout_discount = 0
		data.merchquotout_subtotal = 0
		data.merchquotout_nett = 0
		data.merchquotout_ppn = 0
		data.merchquotout_total = 0
		data.merchquotout_totaladdcost = 0
		data.merchquotout_payment = 0
		data.merchquotoutitem_estgp = 0
		data.merchquotoutitem_estgppercent = 0
		data.merchquotout_version = 0
		data.merchquotout_iscommit = '0'
		data.merchquotout_isapprovalprogress = '0'
		data.merchquotout_isapproved = '0'
		data.merchquotout_isdeclined = '0'
		data.merchquotout_isclose = '0'

		data.unit_id = '--NULL--'
		data.unit_name = 'NONE'
		data.orderintype_id = '--NULL--'
		data.orderintype_name = 'NONE'
		data.partner_id = '0'
		data.partner_name = '-- PILIH --'
		data.ae_empl_id = '--NULL--'
		data.ae_empl_name = 'NONE'
		data.project_id = '--NULL--'
		data.project_name = 'NONE'
		data.sales_dept_id = '0'
		data.sales_dept_name = '-- PILIH --'
		data.dept_id = '0'
		data.sales_dept_name = '-- PILIH --'
		data.ppn_taxtype_id = '--NULL--'
		data.ppn_taxtype_name = 'NONE'
		data.doc_id = global.setup.doc_id
		data.doc_name = global.setup.doc_id

		if (typeof hnd.form_newdata == 'function') {
			hnd.form_newdata(data, options);
		}

		rec_commitby.html('');
		rec_commitdate.html('');
		
		rec_approveby.html('');
		rec_approvedate.html('');
		rec_declineby.html('');
		rec_declinedate.html('');
		


		var button_commit_on = true;
		var button_uncommit_on = false;
		var button_approve_on = false;
		var button_decline_on = false;
		btn_commit.linkbutton(button_commit_on ? 'enable' : 'disable');
		btn_uncommit.linkbutton(button_uncommit_on ? 'enable' : 'disable');
		btn_approve.linkbutton(button_approve_on ? 'enable' : 'disable');
		btn_decline.linkbutton(button_decline_on ? 'enable' : 'disable');
			

		options.OnCanceled = () => {
			$ui.getPages().show('pnl_list')
		}

		$ui.getPages().ITEMS['pnl_edititemsgrid'].handler.createnew(data, options)
		$ui.getPages().ITEMS['pnl_editapprovalgrid'].handler.createnew(data, options)


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

}

function updaterecordstatus(record) {
	// apabila ada keperluan untuk update status record di sini

		rec_commitby.html(record.merchquotout_commitby);
		rec_commitdate.html(record.merchquotout_commitdate);
		
		rec_approveby.html(record.merchquotout_approveby);
		rec_approvedate.html(record.merchquotout_approvedate);
		rec_declineby.html(record.merchquotout_declineby);
		rec_declinedate.html(record.merchquotout_declinedate);
			
}

function updatebuttonstate(record) {
	// apabila ada keperluan untuk update state action button di sini

		/* action button */
		var button_commit_on = false;
		var button_uncommit_on = false;
		var button_approve_on = false;
		var button_decline_on = false;

		
		if (record.merchquotout_isfirm=="1") {
			button_commit_on = false;
			button_uncommit_on = false;
			button_approve_on = false;
			button_decline_on = false;
			form.lock(true);	
		} else if (record.merchquotout_isdeclined=="1" || record.merchquotout_isuseralreadydeclined=="1") {
			button_commit_on = false;
			button_uncommit_on = true;
			button_approve_on = true;
			button_decline_on = false;
			form.lock(true);	
		} else if (record.merchquotout_isapproved=="1" || record.merchquotout_isuseralreadyapproved=="1") {
			button_commit_on = false;
			button_uncommit_on = false;
			button_approve_on = false;
			button_decline_on = true;	
			form.lock(true);	
		} else if (record.merchquotout_isapprovalprogress=="1") {
			button_commit_on = false;
			button_uncommit_on = false;
			button_approve_on = true;
			button_decline_on = true;
			form.lock(true);	
		} else if (record.merchquotout_iscommit=="1") {
			button_commit_on = false;
			button_uncommit_on = true;
			button_approve_on = true;
			button_decline_on = true;
			form.lock(true);		
		} else {
			button_commit_on = true;
			button_uncommit_on = false;
			button_approve_on = false;
			button_decline_on = false;
			form.lock(false);
		} 
	
		btn_commit.linkbutton(button_commit_on ? 'enable' : 'disable');
		btn_uncommit.linkbutton(button_uncommit_on ? 'enable' : 'disable');
		btn_approve.linkbutton(button_approve_on ? 'enable' : 'disable');
		btn_decline.linkbutton(button_decline_on ? 'enable' : 'disable');		
				
}

function updategridstate(record) {
	// apabila ada keperluan untuk update state grid list di sini



	var updategriddata = {}

	var col_commit = 'merchquotout_iscommit';
	updategriddata[col_commit] = record.merchquotout_iscommit;	
	
	var col_approveprogress = 'merchquotout_isapprovalprogress';
	var col_approve = 'merchquotout_isapprove'
	var col_decline = "merchquotout_isdeclined"
	updategriddata[col_approveprogress] = record.merchquotout_isapprovalprogress;
	updategriddata[col_approve] = record.merchquotout_isapproved;
	updategriddata[col_decline] = record.merchquotout_isdeclined;				
			
	$ui.getPages().ITEMS['pnl_list'].handler.updategrid(updategriddata, form.rowid);
			
}

function form_viewmodechanged(viewmode) {
	var OnViewModeChangedEvent = new CustomEvent('OnViewModeChanged', {detail: {}})
	$ui.triggerevent(OnViewModeChangedEvent, {
		viewmode: viewmode
	})
}

function form_idsetup(options) {
	var objid = obj.txt_merchquotout_id
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
	// options.skipmappingresponse = ['unit_id', 'orderintype_id', 'ae_empl_id', 'project_id', 'ppn_taxtype_id', ];
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

async function form_datasaveerror(err, options) {
	// apabila mau olah error messagenya
	// $ui.ShowMessage(err.errormessage)
	console.log(err)
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
	form.setValue(obj.cbo_unit_id, result.dataresponse.unit_name!=='--NULL--' ? result.dataresponse.unit_id : '--NULL--', result.dataresponse.unit_name!=='--NULL--'?result.dataresponse.unit_name:'NONE')
	form.setValue(obj.cbo_orderintype_id, result.dataresponse.orderintype_name!=='--NULL--' ? result.dataresponse.orderintype_id : '--NULL--', result.dataresponse.orderintype_name!=='--NULL--'?result.dataresponse.orderintype_name:'NONE')
	form.setValue(obj.cbo_ae_empl_id, result.dataresponse.ae_empl_name!=='--NULL--' ? result.dataresponse.ae_empl_id : '--NULL--', result.dataresponse.ae_empl_name!=='--NULL--'?result.dataresponse.ae_empl_name:'NONE')
	form.setValue(obj.cbo_project_id, result.dataresponse.project_name!=='--NULL--' ? result.dataresponse.project_id : '--NULL--', result.dataresponse.project_name!=='--NULL--'?result.dataresponse.project_name:'NONE')
	form.setValue(obj.cbo_ppn_taxtype_id, result.dataresponse.ppn_taxtype_name!=='--NULL--' ? result.dataresponse.ppn_taxtype_id : '--NULL--', result.dataresponse.ppn_taxtype_name!=='--NULL--'?result.dataresponse.ppn_taxtype_name:'NONE')

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



function btn_print_click() {

	if (form.isDataChanged() || !form.isInViewMode()) {
		$ui.ShowMessage('Simpan dulu perubahan datanya.');
		return;
	}

	var id = obj.txt_merchquotout_id.textbox('getValue');
	var printurl = 'index.php/printout/' + window.global.modulefullname + '/merchquotout.xprint?id=' + id;

	var print_to_new_window = global.setup.print_to_new_window;
	var debug = false;
	var debug = false;
	if (debug || print_to_new_window) {
		var w = window.open(printurl);
		w.onload = () => {
			window.onreadytoprint(() => {
				iframe.contentWindow.print();
			});
		}
	} else {
		$ui.mask('wait...');
		var iframe_id = 'fgta_printelement';
		var iframe = document.getElementById(iframe_id);
		if (iframe) {
			iframe.parentNode.removeChild(iframe);
			iframe = null;
		}

		if (!iframe) {
			iframe = document.createElement('iframe');
			iframe.id = iframe_id;
			iframe.style.visibility = 'hidden';
			iframe.style.height = '10px';
			iframe.style.widows = '10px';
			document.body.appendChild(iframe);

			iframe.onload = () => {
				$ui.unmask();
				iframe.contentWindow.OnPrintCommand(() => {
					console.log('start print');
					iframe.contentWindow.print();
				});
				iframe.contentWindow.preparemodule();
			}
		}
		iframe.src = printurl + '&iframe=1';

	}

}	






async function btn_action_click(args) {
	if (form.isDataChanged() || !form.isInViewMode()) {
		$ui.ShowMessage('[WARNING]Simpan dulu perubahan data, dan tidak sedang dalam mode edit.');
		return;
	}


	var docname = 'Quotation'
	var txt_version = obj.txt_merchquotout_version;
	var chk_iscommit = obj.chk_merchquotout_iscommit;
	
	var chk_isapprovalprogress = obj.chk_merchquotout_isapprovalprogress;	
	var chk_isapprove = obj.chk_merchquotout_isapproved;
	var chk_isdeclined = obj.chk_merchquotout_isdeclined;
		
	
	var id = form.getCurrentId();

	Object.assign(args, {
		id: id,
		act_url: null,
		act_msg_quest: null,
		act_msg_result: null,
		act_do: null,
		use_otp: false,
		otp_message: `Berikut adalah code yang harus anda masukkan untuk melakukan ${args.action} ${docname} dengan no id ${id}`,
	});

	switch (args.action) {
		case 'commit' :
			args.act_url = `${global.modulefullname}/xtion-commit`;
			args.act_msg_quest = `Apakah anda yakin akan <b>${args.action}</b> ${docname} no ${args.id} ?`;
			args.act_msg_result = `${docname} no ${args.id} telah di ${args.action}.`;
			args.act_do = (result) => {
				chk_iscommit.checkbox('check');
				
			chk_isapprove.checkbox('uncheck');
		
				form.commit();
			}
			break;

		case 'uncommit' :
			args.act_url = `${global.modulefullname}/xtion-uncommit`;
			args.act_msg_quest = `Apakah anda yakin akan <b>${args.action}</b> ${docname} no ${args.id} ?`;
			args.act_msg_result = `${docname} no ${args.id} telah di ${args.action}.`;
			args.act_do = (result) => {
				chk_iscommit.checkbox('uncheck');
				
			chk_isapprove.checkbox('uncheck');
			chk_isdeclined.checkbox('uncheck');
		
				form.setValue(txt_version, result.version);
				form.commit();
			}
			break;

		
		case 'approve' :
			args.act_url = `${global.modulefullname}/xtion-approve`;
			args.act_msg_quest = `Apakah anda yakin akan <b>${args.action}</b> ${docname} no ${args.id} ?`;
			args.act_msg_result = `${docname} no ${args.id} telah di ${args.action}.`;
			args.use_otp = true;
			args.otp_title = 'Approval Code';
			args.param = {
				approve: true,
				approval_note: ''
			}
			args.act_do = (result) => {
				chk_iscommit.checkbox('check');
				chk_isapprovalprogress.checkbox('check');
				chk_isapprove.checkbox(result.isfinalapproval ? "check" : "uncheck");
				chk_isdeclined.checkbox('uncheck');
				form.commit();
			}
			break;

		case 'decline' :
			args.act_url = `${global.modulefullname}/xtion-approve`;
			args.act_msg_quest = '', //`Apakah anda yakin akan <b>${args.action}</b> ${docname} no ${args.id} ?`;
			args.act_msg_result = `${docname} no ${args.id} telah di ${args.action}.`;
			args.use_otp = true;
			args.otp_title = 'Decline Code';
			args.param = {
				approve: false,
				approval_note: args.reason
			}
			args.act_do = (result) => {
				chk_iscommit.checkbox('check');
				chk_isapprove.checkbox('uncheck');
				chk_isdeclined.checkbox('check');
				form.commit();
			}
			break;		
		

	
		

	}


	try {
		$ui.mask('wait..');
		var { doAction } = await import('../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4xtion.mjs');
		await doAction(args, (err, result) => {
			if (err) {
				$ui.ShowMessage('[WARNING]' + err.message);	
			} else {
				if (result.dataresponse!=undefined) { updaterecordstatus(result.dataresponse) };
				args.act_do(result);

				if (result.dataresponse!=undefined) {
					updatebuttonstate(result.dataresponse);
					updategridstate(result.dataresponse);
				}
				if (args.act_msg_result!=='') $ui.ShowMessage('[INFO]' + args.act_msg_result);	
			}
		});
	} catch (err) {
		console.error(err);
		$ui.ShowMessage('[ERROR]' + err.message);
	} finally {
		$ui.unmask();
	}
}	
	
	