'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Merchandise",
	autoid: true,

	persistent: {
		'web_merch' : {
			primarykeys: ['merch_id'],
			comment: 'Daftar Merchandise',
			data: {
				merch_id: {text:'ID', type: dbtype.varchar(14), null:false, options:{required:true,invalidMessage:'ID harus diisi'}},
				merch_name: {text:'Merch Name', type: dbtype.varchar(90), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Site harus diisi'}},
				merch_file: {text:'Picture', type: dbtype.varchar(90), suppresslist: true,  comp: comp.Filebox(), options: { accept: 'image/*' }},

				cluster_id: { 
					text: 'Cluster', type: dbtype.varchar(10), uppercase: true, null: false,   suppresslist: true,
					options: { required: true, invalidMessage: 'Cluster harus diisi' }, 
					comp: comp.Combo({
						table: 'web_cluster',
						field_value: 'cluster_id', field_display: 'cluster_name',
						api: 'retail/webcommerce/webcluster/list'
					})
				},
				
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
			
			defaultsearch : ['merch_id', 'merch_name']
		}	
	},

	schema: {
		title: 'Merchandise',
		header: 'web_merch',
		detils: {
		}

	}
}

