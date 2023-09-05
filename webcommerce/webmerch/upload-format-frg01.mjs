export async function doUpload(args, fn_finish) {
	var result = {}
	var pastedData = args.pastedData;
	var colspattern = "Season|Statement To|Statement|Sold To|Sold To Name||Ship To|Ship To Name|PO|Category Code|Gender|Category|Line|Style|Style Name|Macro Merchandise Typology|Merchandise Typology|Gross Weight|Net Weight|Style - Construction Group|SKU|SKU Type|Serial No|Commercial Series No|Colour Code|Color Group 1|Material Code|Material Name|Material Short Description|Exotic Cites Timbro |CITES TIMBRO Type|Codice INTRASTAT|Material Composition|Lining Composition|Sole Composition|Sole Composition 2|Made In|Preferential Origin|Width|Size|Dimension|Dimgrou|Length|Width|Height|EAN Code|Big Window Code|Start BW Date Act|Cxl BW Date Act|Booked Net Units|Real Wholesale Price Curr|Booked Net WHL Value Curr|Real RTL Price Currency|Booked Net RTL Value Curr"



	var rows = pastedData.split("\n");
	try {
		var head = rows[0];
		var fields = head.split("\t");
		var headpatt = fields.join('|').trim();
		if (headpatt.toUpperCase()!=colspattern.toUpperCase()) {
			console.log(headpatt.toUpperCase());
			console.log(colspattern.toUpperCase());
			throw new Error('Format data tidak sesuai');
		}

		
		rows.shift();
		for (var row of rows) {
			var fields = row.split("\t");
			var data = {}
			var i = 0;
			for (var fieldvalue of fields) {
				var colname = colName(i);
				data[colname] = fieldvalue
				i++;
			}


			var obj = {
				merchraw_id: data['AT'],
				merchraw_name: data['O'],
				merchraw_gender: data['K'],
				merchraw_catcode: data['J'],
				merchraw_catname: data['L'],
				merchraw_line: data['M'],
				merchraw_style: data['N'],
				merchraw_stylename: data['O'],
				merchraw_tipologymacro: data['P'],
				merchraw_tipology: data['Q'],
				merchraw_weightgross: data['R'],
				merchraw_weightnett: data['S'],
				merchraw_sku: data['U'],
				merchraw_skutype: data['V'],
				merchraw_serial1: data['W'],
				merchraw_serial2: data['X'],
				merchraw_colcode: data['Y'],
				merchraw_colname: data['Z'],
				merchraw_colnameshort: '',
				merchraw_matcode: data['AA'],
				merchraw_matname: data['AB'],
				merchraw_matnameshort: data['AC'],
				merchraw_matcmpst: data['AG'],
				merchraw_liningcmpst: data['AH'],
				merchraw_solcmpst1: data['AI'],
				merchraw_solcmpst2: data['AJ'],
				merchraw_madein: data['AK'],
				merchraw_widthgroup: data['AM'],
				merchraw_size: data['AN'],
				merchraw_dim: data['AO'],
				merchraw_dimgroup: data['AP'],
				merchraw_dimlength: data['AQ'],
				merchraw_dimwidth: data['AR'],
				merchraw_dimheight: data['AS'],
				merchraw_barcode: data['AT'],
				brand_id: 'FRG'
			}


			console.log(obj);
		}


	} catch (err) {
		console.error(err);
	}



	if (typeof fn_finish === 'function') {
		fn_finish(null, result)
	}

	return result;
}


function colName(n) {
	var ordA = 'a'.charCodeAt(0);
	var ordZ = 'z'.charCodeAt(0);
	var len = ordZ - ordA + 1;
  
	var s = "";
	while(n >= 0) {
		s = String.fromCharCode(n % len + ordA) + s;
		n = Math.floor(n / len) - 1;
	}
	return s.toUpperCase();
}