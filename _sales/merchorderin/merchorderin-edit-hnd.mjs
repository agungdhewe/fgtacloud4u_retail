let editor, form, obj, opt;

export function init(ed) {
	editor = ed;
	form = editor.form;
	obj = editor.obj;
	opt = editor.opt;

	orderin_isunreferenced_changed(false);

	
}

export function form_newdata(data, options) {
	var promptMandatory = form.getDefaultPrompt(true)

	data.merchquotout_id = promptMandatory.value;
	data.merchquotout_descr = promptMandatory.text;

	orderin_isunreferenced_changed(false);
}

export function form_dataopened(result, options) {
	var isunreference = result.record.orderin_isunreferenced=='1' ? true : false;

	orderin_isunreferenced_changed(isunreference);

}


export function orderin_isunreferenced_changed(checked) {
	var promptMandatory = form.getDefaultPrompt(true)
	var promptOptional = form.getDefaultPrompt(false)


	if (checked) {
		//unreferenced
		obj.cbo_merchquotout_id.revalidate({
			required: false, invalidMessage: null, prompt: form.getDefaultPrompt(false).text,
			validType: null,
		});	
		if (!form.isEventSuspended()) {
			form.setValue(obj.cbo_merchquotout_id, promptOptional.value, promptOptional.text);
		};
		form.setDisable(obj.cbo_merchquotout_id, true);
	} else {
		// harus ada referensi tagihan
		obj.cbo_merchquotout_id.revalidate({
			required: true, invalidMessage:  'Referensi Quotation harus diisi', prompt: form.getDefaultPrompt(true).text,
			validType: "requiredcombo['pnl_edit-cbo_merchquotout_id']",
		});
		if (!form.isEventSuspended()) {
			form.setValue(obj.cbo_merchquotout_id, promptMandatory.value, promptMandatory.text);
		}

		form.setDisable(obj.cbo_merchquotout_id, false);
	}
	
}	


export function cbo_merchquotout_id_dataloading(criteria, options) {
	criteria.unit_id = form.getValue(obj.cbo_unit_id)	
	criteria.partner_id = form.getValue(obj.cbo_partner_id)
}

export function cbo_merchquotout_id_selected(value, display, record, args) {
	form.setValue(obj.cbo_arunbill_coa_id, record.arunbill_coa_id==null?'--NULL--':record.arunbill_coa_id, record.arunbill_coa_name);
	form.setValue(obj.cbo_ar_coa_id, record.ar_coa_id==null?'--NULL--':record.ar_coa_id, record.ar_coa_name);
	form.setValue(obj.cbo_dp_coa_id, record.dp_coa_id==null?'--NULL--':record.dp_coa_id, record.dp_coa_name);
	form.setValue(obj.cbo_sales_coa_id, record.sales_coa_id==null?'--NULL--':record.sales_coa_id, record.sales_coa_name);
	form.setValue(obj.cbo_salesdisc_coa_id, record.salesdisc_coa_id==null?'--NULL--':record.salesdisc_coa_id, record.salesdisc_coa_name);
	form.setValue(obj.cbo_ppn_coa_id, record.ppn_coa_id==null?'--NULL--':record.ppn_coa_id, record.ppn_coa_name);
	form.setValue(obj.cbo_ppnsubsidi_coa_id, record.ppnsubsidi_coa_id==null?'--NULL--':record.ppnsubsidi_coa_id, record.ppnsubsidi_coa_name);
	form.setValue(obj.cbo_trxmodel_id, record.trxmodel_id==null?'--NULL--':record.trxmodel_id, record.trxmodel_name);

	form.setValue(obj.cbo_arunbill_coa_id, record.arunbill_coa_id==null?'--NULL--':record.arunbill_coa_id, record.arunbill_coa_name);
	form.setValue(obj.cbo_ar_coa_id, record.ar_coa_id==null?'--NULL--':record.ar_coa_id, record.ar_coa_name);
	form.setValue(obj.cbo_dp_coa_id, record.dp_coa_id==null?'--NULL--':record.dp_coa_id, record.dp_coa_name);
	form.setValue(obj.cbo_sales_coa_id, record.sales_coa_id==null?'--NULL--':record.sales_coa_id, record.sales_coa_name);
	form.setValue(obj.cbo_salesdisc_coa_id, record.salesdisc_coa_id==null?'--NULL--':record.salesdisc_coa_id, record.salesdisc_coa_name);
	form.setValue(obj.cbo_ppn_coa_id, record.ppn_coa_id==null?'--NULL--':record.ppn_coa_id, record.ppn_coa_name);
	form.setValue(obj.cbo_ppnsubsidi_coa_id, record.ppnsubsidi_coa_id==null?'--NULL--':record.ppnsubsidi_coa_id, record.ppnsubsidi_coa_name);
	form.setValue(obj.cbo_trxmodel_id, record.trxmodel_id==null?'--NULL--':record.trxmodel_id, record.trxmodel_name);

	form.setValue(obj.cbo_ppn_taxtype_id, record.ppn_taxtype_id==null?'--NULL--':record.ppn_taxtype_id, record.ppn_taxtype_name);
	form.setValue(obj.txt_ppn_taxvalue, record.ppn_taxvalue);
	form.setValue(obj.chk_ppn_include, record.ppn_include);

	form.setValue(obj.cbo_orderintype_id, record.orderintype_id, record.orderintype_name);
	form.setValue(obj.txt_merchorderin_descr, record.merchquotout_descr);

}


export function cbo_orderintype_id_selected(value, display, record, args) {
	form.setValue(obj.cbo_arunbill_coa_id, record.arunbill_coa_id==null?'--NULL--':record.arunbill_coa_id, record.arunbill_coa_name);
	form.setValue(obj.cbo_ar_coa_id, record.ar_coa_id==null?'--NULL--':record.ar_coa_id, record.ar_coa_name);
	form.setValue(obj.cbo_dp_coa_id, record.dp_coa_id==null?'--NULL--':record.dp_coa_id, record.dp_coa_name);
	form.setValue(obj.cbo_sales_coa_id, record.sales_coa_id==null?'--NULL--':record.sales_coa_id, record.sales_coa_name);
	form.setValue(obj.cbo_salesdisc_coa_id, record.salesdisc_coa_id==null?'--NULL--':record.salesdisc_coa_id, record.salesdisc_coa_name);
	form.setValue(obj.cbo_ppn_coa_id, record.ppn_coa_id==null?'--NULL--':record.ppn_coa_id, record.ppn_coa_name);
	form.setValue(obj.cbo_ppnsubsidi_coa_id, record.ppnsubsidi_coa_id==null?'--NULL--':record.ppnsubsidi_coa_id, record.ppnsubsidi_coa_name);
	form.setValue(obj.cbo_trxmodel_id, record.trxmodel_id==null?'--NULL--':record.trxmodel_id, record.trxmodel_name);

	form.setValue(obj.cbo_ppn_taxtype_id, record.ppn_taxtype_id==null?'--NULL--':record.ppn_taxtype_id, record.ppn_taxtype_name);
	form.setValue(obj.txt_ppn_taxvalue, record.ppn_taxvalue);
	form.setValue(obj.chk_ppn_include, record.ppn_include);
}


