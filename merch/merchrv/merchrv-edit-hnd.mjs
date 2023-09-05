let editor, form, obj, opt;

export function init(ed) {
	editor = ed;
	form = editor.form;
	obj = editor.obj;
	opt = editor.opt;



	
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