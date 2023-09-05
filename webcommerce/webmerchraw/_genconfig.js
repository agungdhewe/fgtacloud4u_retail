'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Merchandise Raw",
	autoid: true,

	persistent: {
		'web_merchraw' : {
			primarykeys: ['merchraw_id'],
			comment: 'Daftar Merchandise',
			data: {
				merchraw_id: {text:'ID', type: dbtype.varchar(14), null:false, options:{required:true,invalidMessage:'ID harus diisi'}},
				merchraw_name: {text:'Merch Name', type: dbtype.varchar(255), null:true},
				merchraw_gender: {text:'Gender', type: dbtype.varchar(30), null:true},
				merchraw_catcode: {text:'Category Code', type: dbtype.varchar(15), null:true},
				merchraw_catname: {text:'Category Name', type: dbtype.varchar(100), null:true},
				merchraw_line: {text:'Line', type: dbtype.varchar(30), null:true},
				merchraw_style: {text:'Style', type: dbtype.varchar(30), null:true},
				merchraw_stylename: {text:'Style Name', type: dbtype.varchar(30), null:true},
				merchraw_tipologymacro: {text:'Tipology Macro', type: dbtype.varchar(90), null:true},
				merchraw_tipology: {text:'Tipology', type: dbtype.varchar(90), null:true},
				merchraw_weightgross: {text:'Weight Gross', type: dbtype.decimal(7,2), null:false, default:0},
				merchraw_weightnett: {text:'Weight Nett', type: dbtype.decimal(7,2), null:false, default:0},
				merchraw_sku: {text:'SKU', type: dbtype.varchar(30), null:true},
				merchraw_skutype: {text:'SKU Type', type: dbtype.varchar(30), null:true},
				merchraw_serial1: {text:'Serial 1', type: dbtype.varchar(30), null:true},
				merchraw_serial2: {text:'Serial 2', type: dbtype.varchar(30), null:true},
				merchraw_colcode: {text:'Color Code', type: dbtype.varchar(30), null:true},
				merchraw_colname: {text:'Color Name', type: dbtype.varchar(60), null:true},
				merchraw_colnameshort: {text:'Short Color Name', type: dbtype.varchar(60), null:true},
				merchraw_matcode: {text:'Material Code', type: dbtype.varchar(30), null:true},
				merchraw_matname: {text:'Material Name', type: dbtype.varchar(60), null:true},
				merchraw_matnameshort: {text:'Short Material Name', type: dbtype.varchar(60), null:true},
				merchraw_matcmpst: {text:'Material Composition', type: dbtype.varchar(255), null:true},
				merchraw_liningcmpst: {text:'Lining Composition', type: dbtype.varchar(255), null:true},
				merchraw_solcmpst1: {text:'Sole Composition 1', type: dbtype.varchar(255), null:true},
				merchraw_solcmpst2: {text:'Sole Composition 2', type: dbtype.varchar(255), null:true},
				merchraw_madein: {text:'Made In', type: dbtype.varchar(30), null:true},
				merchraw_widthgroup: {text:'Width Group', type: dbtype.varchar(10), null:true},
				merchraw_size: {text:'Size', type: dbtype.varchar(10), null:true},
				merchraw_dim: {text:'Dimension', type: dbtype.varchar(30), null:true},
				merchraw_dimgroup: {text:'Dimension Group', type: dbtype.varchar(30), null:true},
				merchraw_dimlength: {text:'Length', type: dbtype.decimal(7,2), null:false, default:0},
				merchraw_dimwidth: {text:'Width', type: dbtype.decimal(7,2), null:false, default:0},
				merchraw_dimheight: {text:'Height', type: dbtype.decimal(7,2), null:false, default:0},
				merchraw_barcode: {text:'Barcode', type: dbtype.varchar(30), null:true},

				brand_id: { 
					text: 'Brand', type: dbtype.varchar(10), uppercase: true, null: false,   suppresslist: true,
					options: { required: true, invalidMessage: 'Cluster harus diisi' }, 
					comp: comp.Combo({
						table: 'web_brand',
						field_value: 'brand_id', field_display: 'brand_name',
						api: 'retail/webcommerce/webbrand/list'
					})
				}
			},
			
			defaultsearch : ['merch_id', 'merch_name'],
			uniques: {
				'merchraw_barcode': ['brand_id', 'merchraw_barcode']
			}


		}	
	},

	schema: {
		title: 'Merchandise Raw',
		header: 'web_merchraw',
		detils: {
		}

	}
}

