'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Merchandise Category",
	autoid: false,

	persistent: {
		'web_merchitemcat' : {
			primarykeys: ['merchitemcat_id'],
			comment: 'Daftar Category',
			data: {
				merchitemcat_id: {text:'ID', type: dbtype.varchar(30), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				merchitemcat_name: {text:'Category Name', type: dbtype.varchar(90), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Site harus diisi'}},
				merchitemcat_descr: {text:'Description', type: dbtype.varchar(255), null:false},

				merchitemgro_id: { 
					text: 'Group', type: dbtype.varchar(30), uppercase: true, null: false,   suppresslist: true,
					options: { required: true, invalidMessage: 'Group harus diisi' }, 
					comp: comp.Combo({
						table: 'web_merchitemgro',
						field_value: 'merchitemgro_id', field_display: 'merchitemgro_name',
						api: 'retail/webcommerce/webmerchitemgro/list'
					})
				},

				gender_id: { 
					text: 'Gender', type: dbtype.varchar(7), uppercase: true, null: false,   suppresslist: true,
					options: { required: true, invalidMessage: 'Gender harus diisi' }, 
					comp: comp.Combo({
						table: 'web_gender',
						field_value: 'gender_id', field_display: 'gender_name',
						api: 'retail/webcommerce/webgender/list'
					})
				},

				cluster_id: { 
					text: 'Cluster', type: dbtype.varchar(10), uppercase: true, null: false,  suppresslist: true,
					options: { required: true, invalidMessage: 'Cluster harus diisi' }, 
					comp: comp.Combo({
						table: 'web_cluster',
						field_value: 'cluster_id', field_display: 'cluster_name',
						api: 'retail/webcommerce/webcluster/list'
					})
				}				
			},
			defaultsearch : ['merchitemcat_id', 'merchitemcat_name'],
			uniques: {
				'merchitemcat_name' : ['cluster_id', 'merchitemcat_name']
			}
		},

		'web_merchitemcatpic' : {
			primarykeys: ['merchitemcatpic_id'],
			comment: 'Daftar Picture Category Merch Item',
			data: {
				merchitemcatpic_id: {text:'ID', type: dbtype.varchar(14), null:false},	
				merchitemcatpic_name: {text:'Name', type: dbtype.varchar(30), null:false, options: {required:true,invalidMessage:'Picture Name harus diisi'}},	
				merchitemcatpic_descr: {text:'Descr', type: dbtype.varchar(90), null:false},	
				merchitemcatpic_order: {text:'Order', type: dbtype.int(4), null:false, default:'0', suppresslist: true},
				merchitemcatpic_file: {text:'Picture', type: dbtype.varchar(90), suppresslist: true,  comp: comp.Filebox(), options: { accept: 'image/*' }},
				merchitemcat_id: {text:'Site', type: dbtype.varchar(30), null:false},	
			},
			defaultsearch: ['merchitemcatpic_id', 'merchitemcatpic_descr'],
			uniques: {
				'merchitemcatpic_name' : ['merchitemcat_id', 'merchitemcatpic_name']
			}
		},

		'web_merchitemcatprop' : {
			primarykeys: ['merchitemcatprop_id'],
			comment: 'Daftar Properties Category Merch Item',
			data: {
				merchitemcatprop_id: {text:'ID', type: dbtype.varchar(14), null:false},	
				webproptype_id: { 
					text: 'Prop Type', type: dbtype.varchar(20), uppercase: true, null: false,   suppresslist: true,
					options: { required: true, invalidMessage: 'Tipe Properties harus diisi' }, 
					comp: comp.Combo({
						table: 'web_webproptype',
						field_value: 'webproptype_id', field_display: 'webproptype_name',
						api: 'retail/webcommerce/webproptype/list'
					})
				},
				merchitemcatprop_value: {text:'Value', type: dbtype.varchar(90), null:false, options: {required:true,invalidMessage:'Value harus diisi'}},	
				merchitemcat_id: {text:'Site', type: dbtype.varchar(30), null:false},	
			},
			defaultsearch: ['merchitemcatpic_id', 'merchitemcatpic_descr'],
			uniques: {}
		},		
	},


	schema: {
		title: 'Category',
		header: 'web_merchitemcat',
		detils: {
			'picture': {title: 'Picture', table: 'web_merchitemcatpic', form: true, headerview: 'merchitemcat_name' },
			'prop': {title: 'Properties', table: 'web_merchitemcatprop', form: true, headerview: 'merchitemcat_name' }
		}
	}


}
