var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'

const btn_edit = $('#pnl_edit-btn_edit')
const btn_save = $('#pnl_edit-btn_save')
const btn_delete = $('#pnl_edit-btn_delete')


const btn_commit = $('#pnl_edit-btn_commit')
const btn_uncommit = $('#pnl_edit-btn_uncommit')
			


const fl_editorial_picture_img = $('#pnl_edit-fl_editorial_picture_img');
const fl_editorial_picture_lnk = $('#pnl_edit-fl_editorial_picture_link');				
				

const pnl_form = $('#pnl_edit-form')
const obj = {
	txt_editorial_id: $('#pnl_edit-txt_editorial_id'),
	txt_editorial_title: $('#pnl_edit-txt_editorial_title'),
	txt_editorial_preface: $('#pnl_edit-txt_editorial_preface'),
	dt_editorial_datestart: $('#pnl_edit-dt_editorial_datestart'),
	dt_editorial_dateend: $('#pnl_edit-dt_editorial_dateend'),
	chk_editorial_isdatelimit: $('#pnl_edit-chk_editorial_isdatelimit'),
	chk_editorial_isinhomecarousel: $('#pnl_edit-chk_editorial_isinhomecarousel'),
	txt_editorial_content: $('#pnl_edit-txt_editorial_content'),
	txt_editorial_tags: $('#pnl_edit-txt_editorial_tags'),
	txt_editorial_keyword: $('#pnl_edit-txt_editorial_keyword'),
	fl_editorial_picture: $('#pnl_edit-fl_editorial_picture'),
	chk_editorial_iscommit: $('#pnl_edit-chk_editorial_iscommit'),
	txt_editorial_commitby: $('#pnl_edit-txt_editorial_commitby'),
	txt_editorial_commitdate: $('#pnl_edit-txt_editorial_commitdate'),
	txt_editorial_version: $('#pnl_edit-txt_editorial_version'),
	cbo_editorialtype_id: $('#pnl_edit-cbo_editorialtype_id'),
	cbo_cluster_id: $('#pnl_edit-cbo_cluster_id')
}

const txt_editor = $('#pnl_edit-txt_editor');
const rec_commitby = $('#pnl_edit_record-commitby');
const rec_commitdate = $('#pnl_edit_record-commitdate');		

const dt_editorial_dateend_container = $('#pnl_edit-dt_editorial_dateend_container')

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
		primary: obj.txt_editorial_id,
		autoid: true,
		logview: 'web_editorial',
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
		OnNewDataCanceled: () => { form_canceledit() },
		OnRecordStatusCreated: () => {
			
		$('#pnl_edit_record_custom').detach().appendTo("#pnl_edit_record");
		$('#pnl_edit_record_custom').show();		
					
		}		
	})



	btn_commit.linkbutton({ onClick: () => { btn_action_click({ action: 'commit' }); } });
	btn_uncommit.linkbutton({ onClick: () => { btn_action_click({ action: 'uncommit' }); } });			
			

	var editor = txt_editor.texteditor('getEditor');
	editor[0].addEventListener('input', function(ev) {
		form.markDataChanged(true);
	});


	obj.chk_editorial_isdatelimit.checkbox({ onChange: (value) => { chk_editorial_isdatelimit_checkedchange(value) }});



	obj.fl_editorial_picture.filebox({
		onChange: function(value) {
			var files = obj.fl_editorial_picture.filebox('files');
			var f = files[0];
			var reader = new FileReader();
			reader.onload = (function(loaded) {
				return function(e) {
					if (loaded.type.startsWith('image')) {
						var image = new Image();
						image.src = e.target.result;
						image.onload = function() {
							fl_editorial_picture_img.attr('src', e.target.result);
							fl_editorial_picture_img.show();
							fl_editorial_picture_lnk.hide();
						}
					} else {
						fl_editorial_picture_img.hide();
						fl_editorial_picture_lnk.hide();
					}
				}
			})(f);
			if (f!==undefined) { reader.readAsDataURL(f) }
		}
	})				
				


	new fgta4slideselect(obj.cbo_editorialtype_id, {
		title: 'Pilih editorialtype_id',
		returnpage: this_page_id,
		api: $ui.apis.load_editorialtype_id,
		fieldValue: 'editorialtype_id',
		fieldValueMap: 'editorialtype_id',
		fieldDisplay: 'editorialtype_name',
		fields: [
			{mapping: 'editorialtype_id', text: 'editorialtype_id'},
			{mapping: 'editorialtype_name', text: 'editorialtype_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
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
  		updaterecordstatus(result.record)

		txt_editor.texteditor('readonly', true);  
		txt_editor.texteditor('setValue', result.record.editorial_content);

		if (result.record.editorial_isdatelimit=="1") {
			dt_editorial_dateend_container.show();
		} else {
			dt_editorial_dateend_container.hide();
		}

		form.SuspendEvent(true);
		form
			.fill(result.record)
			.setValue(obj.cbo_editorialtype_id, result.record.editorialtype_id, result.record.editorialtype_name)
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
		data.editorial_datestart = global.now()
		data.editorial_dateend = global.now()
		data.editorial_version = 0

		data.editorialtype_id = '0'
		data.editorialtype_name = '-- PILIH --'
		data.cluster_id = '0'
		data.cluster_name = '-- PILIH --'


		rec_commitby.html('');
		rec_commitdate.html('');
		
		txt_editor.texteditor('setValue', '');


		fl_editorial_picture_img.hide();
		fl_editorial_picture_lnk.hide();	
		obj.fl_editorial_picture.filebox('clear');		
				


		var button_commit_on = true;
		var button_uncommit_on = false;
		btn_commit.linkbutton(button_commit_on ? 'enable' : 'disable');
		btn_uncommit.linkbutton(button_uncommit_on ? 'enable' : 'disable');



		options.OnCanceled = () => {
			$ui.getPages().show('pnl_list')
		}

		$ui.getPages().ITEMS['pnl_editpicturegrid'].handler.createnew(data, options)
		$ui.getPages().ITEMS['pnl_editmerchgrid'].handler.createnew(data, options)


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

		obj.fl_editorial_picture.filebox('clear');			
		if (record.editorial_picture_doc!=undefined) {
			if (record.editorial_picture_doc.type.startsWith('image')) {
				fl_editorial_picture_lnk.hide();
				fl_editorial_picture_img.show();
				fl_editorial_picture_img.attr('src', record.editorial_picture_doc.attachmentdata);
			} else {
				fl_editorial_picture_img.hide();
				fl_editorial_picture_lnk.show();
				fl_editorial_picture_lnk[0].onclick = () => {
					fl_editorial_picture_lnk.attr('download', record.editorial_picture_doc.name);
					fl_editorial_picture_lnk.attr('href', record.editorial_picture_doc.attachmentdata);
				}
			}	
		} else {
			fl_editorial_picture_img.hide();
			fl_editorial_picture_lnk.hide();			
		}				
				
}

function updaterecordstatus(record) {
	// apabila ada keperluan untuk update status record di sini

		rec_commitby.html(record.editorial_commitby);
		rec_commitdate.html(record.editorial_commitdate);
		
}

function updatebuttonstate(record) {
	// apabila ada keperluan untuk update state action button di sini

		/* action button */
		var button_commit_on = false;
		var button_uncommit_on = false;	
		
		if (record.editorial_iscommit=="1") {
			button_commit_on = false;
			button_uncommit_on = true;
			form.lock(true);		
		} else {
			button_commit_on = true;
			button_uncommit_on = false;
			form.lock(false);
		} 
		btn_commit.linkbutton(button_commit_on ? 'enable' : 'disable');
		btn_uncommit.linkbutton(button_uncommit_on ? 'enable' : 'disable');		
			
}

function updategridstate(record) {
	// apabila ada keperluan untuk update state grid list di sini



	var updategriddata = {}

	var col_commit = 'editorial_iscommit';
	updategriddata[col_commit] = record.editorial_iscommit;	
	
	$ui.getPages().ITEMS['pnl_list'].handler.updategrid(updategriddata, form.rowid);
			
}

function form_viewmodechanged(viewmode) {
	var OnViewModeChangedEvent = new CustomEvent('OnViewModeChanged', {detail: {}})
	$ui.triggerevent(OnViewModeChangedEvent, {
		viewmode: viewmode
	})


	if (viewmode) {
		txt_editor.texteditor('readonly', true); 
		txt_editor.texteditor('getEditor').removeClass('input-modeedit-force');
		// txt_editor.texteditor('getEditor').removeClass('input-modeedit');
	} else {
		txt_editor.texteditor('readonly', false); 
		txt_editor.texteditor('getEditor').addClass('input-modeedit-force');
		
		// txt_editor.texteditor('getEditor').addClass('input-modeedit');		
	}
}

function form_canceledit() {
	txt_editor.texteditor('setValue', form.getValue(obj.txt_editorial_content));
}

function form_idsetup(options) {
	var objid = obj.txt_editorial_id
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
	data.editorial_content = txt_editor.texteditor('getValue');

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


	form.rowid = $ui.getPages().ITEMS['pnl_list'].handler.updategrid(data, form.rowid)
}



async function form_deleting(data) {
}

async function form_deleted(result, options) {
	$ui.getPages().show('pnl_list')
	$ui.getPages().ITEMS['pnl_list'].handler.removerow(form.rowid)

}





async function btn_action_click(args) {
	if (form.isDataChanged() || !form.isInViewMode()) {
		$ui.ShowMessage('[WARNING]Simpan dulu perubahan data, dan tidak sedang dalam mode edit.');
		return;
	}


	var docname = 'Editorial'
	var txt_version = obj.txt_editorial_version;
	var chk_iscommit = obj.chk_editorial_iscommit;
	
	
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
			args.act_url = `${global.modulefullname}/xtion-${args.action}`;
			args.act_msg_quest = `Apakah anda yakin akan <b>${args.action}</b> ${docname} no ${args.id} ?`;
			args.act_msg_result = `${docname} no ${args.id} telah di ${args.action}.`;
			args.act_do = (result) => {
				chk_iscommit.checkbox('check');
				
				form.commit();
			}
			break;

		case 'uncommit' :
			args.act_url = `${global.modulefullname}/xtion-${args.action}`;
			args.act_msg_quest = `Apakah anda yakin akan <b>${args.action}</b> ${docname} no ${args.id} ?`;
			args.act_msg_result = `${docname} no ${args.id} telah di ${args.action}.`;
			args.act_do = (result) => {
				chk_iscommit.checkbox('uncheck');
				
				form.setValue(txt_version, result.version);
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
				updaterecordstatus(result.dataresponse);
				args.act_do(result);
				updatebuttonstate(result.dataresponse);
				updategridstate(result.dataresponse);
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
	

function chk_editorial_isdatelimit_checkedchange(checked) {
	if (checked) {
		dt_editorial_dateend_container.show();
	} else {
		dt_editorial_dateend_container.hide();
	}
}