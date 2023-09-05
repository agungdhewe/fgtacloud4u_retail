let editor, form, obj, opt;
let price_iseditable = false;


export function init(ed) {
	editor = ed;
	form = editor.form;
	obj = editor.obj;
	opt = editor.opt;


	var cbo_merchitem_id_options = obj.cbo_merchitem_id.getOptions();
	cbo_merchitem_id_options.OnRowRender = (td) => {
		cbo_merchitem_id_OnRowRender(td);
	}
	


	form.setDisable(obj.txt_merchorderinitem_price, true);
	form.setDisable(obj.txt_merchorderinitem_pricediscpercent, true);
	form.setDisable(obj.chk_merchorderinitem_isdiscvalue, true);
	form.setDisable(obj.txt_merchorderinitem_pricediscvalue, true);

	merchorderinitem_isdiscvalue_changed(false);
	

}

export function form_newdata(data, options) {



	merchorderinitem_isdiscvalue_changed(false);

	set_merchorderitem_property_readonly();
	
}	

export function form_dataopened(result, options) {
	var isdiscvalue = result.record.merchorderinitem_isdiscvalue=='1' ? true : false;

	merchorderinitem_isdiscvalue_changed(isdiscvalue);

	
	set_merchorderitem_property_readonly();

}





export function merchorderinitem_isdiscvalue_changed(checked) {
	if (price_iseditable) {
		if (checked) {
			form.setDisable(obj.txt_merchorderinitem_pricediscpercent, true);
			form.setDisable(obj.txt_merchorderinitem_pricediscvalue, false);
		} else {
			form.setDisable(obj.txt_merchorderinitem_pricediscpercent, false);
			form.setDisable(obj.txt_merchorderinitem_pricediscvalue, true);
		}
	}
}


export function cbo_merchitem_id_dataloading(criteria, options) {
	var header_data = form.getHeaderData();
	var isunreference = header_data.orderin_isunreferenced=='1' ? true : false;

	if (isunreference) {
		options.api = $ui.apis.load_merchitem_id;
	} else {
		options.api = 'retail/sales/merchquotout/get-merchitem';
		criteria.merchquotout_id = header_data.merchquotout_id;
	}

	criteria.unit_id = header_data.unit_id;	

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
	
	form.setValue(obj.txt_merchorderinitem_qty, 1);
	form.setValue(obj.txt_merchorderinitem_price, record.merchitem_price);
	form.setValue(obj.txt_merchorderinitem_pricediscpercent, 0);
	form.setValue(obj.txt_merchorderinitem_pricediscvalue, 0);
	form.setValue(obj.txt_merchorderinitem_subtotal, record.merchitem_price);
	form.setValue(obj.txt_merchorderinitem_estgp, (record.merchitem_price-record.merchitem_lastcogs));


	form.setValue(obj.txt_merchquotoutitem_qty, 1);
	form.setValue(obj.txt_merchquotoutitem_price, record.merchitem_price);
	form.setValue(obj.txt_merchquotoutitem_pricediscpercent, 0);
	form.setValue(obj.txt_merchquotoutitem_pricediscvalue, 0);
	form.setValue(obj.txt_merchquotoutitem_subtotal, record.merchitem_price);
	form.setValue(obj.txt_merchquotoutitem_estgp, (record.merchitem_price-record.merchitem_lastcogs));


	set_merchorderitem_property_readonly();
}


export function merchorderinitem_qty_changed(newvalue, oldvalue) {
	recalculate();
}


function recalculate() {
	var header_data = form.getHeaderData();


	var isdiscvalue = form.getValue(obj.chk_merchorderinitem_isdiscvalue);

	var qty = parseInt(form.getValue(obj.txt_merchorderinitem_qty));
	var price = parseFloat(form.getValue(obj.txt_merchorderinitem_price));
	var pricediscvalue = 0;
	var pricesubtotal = 0;

	if (isdiscvalue) {
		pricediscvalue = parseFloat(form.getValue(obj.pricediscvalue));
	} else {
		var pricediscpercent = parseFloat(form.getValue(obj.txt_merchorderinitem_pricediscpercent));
		pricediscvalue = price * (pricediscpercent/100);
	}

	pricesubtotal = (price - pricediscvalue) * qty;
	form.setValue(obj.txt_merchorderinitem_subtotal, pricesubtotal);



	// calculate gross profit
	var cost = parseFloat(form.getValue(obj.txt_merchorderinitem_estgp));
	var ppn_include = header_data.ppn_include;
	var ppn_taxvalue = header_data.ppn_taxvalue;
	
	var item_ppnvalue = 0;
	var gp_value = 0;
	var gp_percent = 0;
	if (ppn_include) {
		item_ppnvalue = pricesubtotal - (pricesubtotal/((100+ppn_taxvalue)/100));
		gp_value = pricesubtotal - cost - item_ppnvalue;
		gp_percent = 100 * (gp_value / pricesubtotal);
	} else {
		item_ppnvalue = (ppn_taxvalue/100) * pricesubtotal;
		gp_value = pricesubtotal - cost;
		gp_percent = 100 * (gp_value / (pricesubtotal + item_ppnvalue));
	}


	form.setValue(obj.txt_merchorderinitem_estgp, gp_value);
	form.setValue(obj.txt_merchorderinitem_estgppercent, gp_percent);
	

}






function set_merchorderitem_property_readonly() {
	obj.txt_merchitem_art.textbox('readonly', true);
	obj.txt_merchitem_mat.textbox('readonly', true);
	obj.txt_merchitem_col.textbox('readonly', true);
	obj.txt_merchitem_size.textbox('readonly', true);
	obj.txt_merchitem_name.textbox('readonly', true);
}


function cbo_merchitem_id_OnRowRender(td) {

}