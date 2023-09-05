'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Merch Format",
	autoid: false,

	persistent: {
		'web_merchformat' : {
			primarykeys: ['merchformat_id'],
			comment: 'Daftar Format Merchandise',
			data: {
				merchformat_id: {text:'ID', type: dbtype.varchar(10), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}}, 
				merchformat_name: {text:'Format', type: dbtype.varchar(90), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Fromat harus diisi'}},
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
			defaultsearch : ['merchformat_id', 'merchformat_name'],
			uniques: {
				'merchformat_name' : ['merchformat_name']
			}			
		},
	},

	schema: {
		title: 'Merch Format',
		header: 'web_merchformat',
		detils: {
		}
	}

}