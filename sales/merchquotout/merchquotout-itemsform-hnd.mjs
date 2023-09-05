let editor, form, obj, opt;

export function init(ed) {
	editor = ed;
	form = editor.form;
	obj = editor.obj;
	opt = editor.opt;



	
}

	
	
export function cbo_merchitem_id_selected(value, display, record, args) {

	form.setValue(obj.txt_merchitem_art, record.merchitem_art);
	form.setValue(obj.txt_merchitem_mat, record.merchitem_mat);
	form.setValue(obj.txt_merchitem_col, record.merchitem_col);
	form.setValue(obj.txt_merchitem_size, record.merchitem_size);
	form.setValue(obj.txt_merchitem_name, record.merchitem_name);

	form.setValue(obj.cbo_merchitemctg_id, record.merchitemctg_id, record.merchitemctg_name);
	form.setValue(obj.cbo_merchsea_id, record.merchsea_id, record.merchsea_name);
	form.setValue(obj.cbo_brand_id, record.brand_id, record.brand_name);
	form.setValue(obj.cbo_itemclass_id, record.itemclass_id, record.itemclass_name);

	
	form.setValue(obj.txt_merchitem_priceori, record.merchitem_priceori);
	form.setValue(obj.txt_merchitem_price, record.merchitem_price);
	form.setValue(obj.txt_merchitem_pricediscpercent, 0);
	form.setValue(obj.txt_merchitem_pricediscvalue, 0);
	form.setValue(obj.txt_merchitem_cogs, record.merchitem_lastcogs);
	

	form.setValue(obj.txt_merchquotoutitem_qty, 1);
	form.setValue(obj.txt_merchquotoutitem_price, record.merchitem_price);
	form.setValue(obj.txt_merchquotoutitem_pricediscpercent, 0);
	form.setValue(obj.txt_merchquotoutitem_pricediscvalue, 0);
	form.setValue(obj.txt_merchquotoutitem_subtotal, record.merchitem_price);
	form.setValue(obj.txt_merchquotoutitem_estgp, (record.merchitem_price-record.merchitem_lastcogs));
	

}