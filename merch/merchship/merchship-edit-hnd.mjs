let editor, form, obj, opt;

export function init(ed) {
	editor = ed;
	form = editor.form;
	obj = editor.obj;
	opt = editor.opt;



	
}

export function cbo_unit_id_dataloading(criteria, options) {
	criteria.unit_isdisabled=0;
}

export function cbo_merchorderout_id_dataloading(criteria, options) {
	criteria.unit_id = obj.cbo_unit_id.combobox('getValue');
	criteria.merchorderout_iscommit = 1;
}

export function cbo_merchorderout_id_selected(value, display, record, args) {
	console.log(record);
	form.setValue(obj.cbo_curr_id, record.curr_id, record.curr_name);
	form.setValue(obj.cbo_principal_partner_id, record.principal_partner_id, record.principal_partner_name);
	form.setValue(obj.cbo_dept_id, record.dept_id, record.dept_name);
	form.setValue(obj.cbo_merchsea_id, record.merchsea_id, record.merchsea_name);
}

	
export function form_newdata(data, options) {
	form.setDisable(obj.cbo_unit_id, false);
}

export function form_dataopened(result, options) {
	form.setDisable(obj.cbo_unit_id, true);
}

export function form_datasaved(result, rowdata, options) {
	form.setDisable(obj.cbo_unit_id, true);
}	

export function btn_verify_click() {
	console.log('verify');
}
