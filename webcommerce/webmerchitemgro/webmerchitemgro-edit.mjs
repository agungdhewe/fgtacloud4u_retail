var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'

const btn_edit = $('#pnl_edit-btn_edit')
const btn_save = $('#pnl_edit-btn_save')
const btn_delete = $('#pnl_edit-btn_delete')





const pnl_form = $('#pnl_edit-form')
const obj = {
	txt_merchitemgro_id: $('#pnl_edit-txt_merchitemgro_id'),
	txt_merchitemgro_name: $('#pnl_edit-txt_merchitemgro_name'),
	txt_merchitemgro_descr: $('#pnl_edit-txt_merchitemgro_descr'),
	cbo_gender_id: $('#pnl_edit-cbo_gender_id'),
	cbo_cluster_id: $('#pnl_edit-cbo_cluster_id')
}




let form = {}

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
		primary: obj.txt_merchitemgro_id,
		autoid: false,
		logview: 'web_merchitemgro',
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
	})








	new fgta4slideselect(obj.cbo_gender_id, {
		title: 'Pilih gender_id',
		returnpage: this_page_id,
		api: $ui.apis.load_gender_id,
		fieldValue: 'gender_id',
		fieldValueMap: 'gender_id',
		fieldDisplay: 'gender_name',
		fields: [
			{mapping: 'gender_id', text: 'gender_id'},
			{mapping: 'gender_name', text: 'gender_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			result.records.unshift({gender_id:'--NULL--', gender_name:'NONE'});	
		},
		OnSelected: (value, display, record) => {}
	})				
				
	new fgta4slideselect(obj.cbo_cluster_id, {
		title: 'Pilih cluster_id',
		returnpage: this_page_id,
		api: $ui.apis.load_cluster_id,
		fieldValue: 'cluster_id',
		fieldValueMap: 'cluster_id',
		fieldDisplay: 'cluster_name',
		fields: [
			{mapping: 'cluster_id', text: 'cluster_id'},
			{mapping: 'cluster_name', text: 'cluster_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {}
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



}


export function OnSizeRecalculated(width, height) {
}




export function open(data, rowid, viewmode=true, fn_callback) {


	var fn_dataopening = async (options) => {
		options.criteria[form.primary.mapping] = data[form.primary.mapping]
	}

	var fn_dataopened = async (result, options) => {

		updatefilebox(result.record);

		if (result.record.gender_id==null) { result.record.gender_id='--NULL--'; result.record.gender_name='NONE'; }

  		updaterecordstatus(result.record)

		form.SuspendEvent(true);
		form
			.fill(result.record)
			.setValue(obj.cbo_gender_id, result.record.gender_id, result.record.gender_name)
			.setValue(obj.cbo_cluster_id, result.record.cluster_id, result.record.cluster_name)
			.commit()
			.setViewMode(viewmode)
			.lock(false)
			.rowid = rowid

		// tampilkan form untuk data editor
		fn_callback()
		form.SuspendEvent(false);

		updatebuttonstate(result.record)
		


		// fill data, bisa dilakukan secara manual dengan cara berikut:	
		// form
			// .setValue(obj.txt_id, result.record.id)
			// .setValue(obj.txt_nama, result.record.nama)
			// .setValue(obj.cbo_prov, result.record.prov_id, result.record.prov_nama)
			// .setValue(obj.chk_isdisabled, result.record.disabled)
			// .setValue(obj.txt_alamat, result.record.alamat)
			// ....... dst dst
			// .commit()
			// .setViewMode()
			// ....... dst dst

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

		data.gender_id = '--NULL--'
		data.gender_name = 'NONE'
		data.cluster_id = '0'
		data.cluster_name = '-- PILIH --'









		options.OnCanceled = () => {
			$ui.getPages().show('pnl_list')
		}



	})
}


export function detil_open(pnlname) {
	if (form.isDataChanged()) {
		$ui.ShowMessage('Simpan dulu perubahan datanya.')
		return;
	}

	//$ui.getPages().show(pnlname)
	$ui.getPages().show(pnlname, () => {
		$ui.getPages().ITEMS[pnlname].handler.OpenDetil(form.getData())
	})	
}


function updatefilebox(record) {
	// apabila ada keperluan untuk menampilkan data dari object storage

}

function updaterecordstatus(record) {
	// apabila ada keperluan untuk update status record di sini

}

function updatebuttonstate(record) {
	// apabila ada keperluan untuk update state action button di sini
	
}

function updategridstate(record) {
	// apabila ada keperluan untuk update state grid list di sini
	
}

function form_viewmodechanged(viewmode) {
	var OnViewModeChangedEvent = new CustomEvent('OnViewModeChanged', {detail: {}})
	$ui.triggerevent(OnViewModeChangedEvent, {
		viewmode: viewmode
	})
}

function form_idsetup(options) {
	var objid = obj.txt_merchitemgro_id
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

	options.skipmappingresponse = ["gender_id"];

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

	form.setValue(obj.cbo_gender_id, result.dataresponse.gender_name!=='--NULL--' ? result.dataresponse.gender_id : '--NULL--', result.dataresponse.gender_name!=='--NULL--'?result.dataresponse.gender_name:'NONE')

	form.rowid = $ui.getPages().ITEMS['pnl_list'].handler.updategrid(data, form.rowid)
}



async function form_deleting(data) {
}

async function form_deleted(result, options) {
	$ui.getPages().show('pnl_list')
	$ui.getPages().ITEMS['pnl_list'].handler.removerow(form.rowid)

}



