'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Merchandise Groups",
	autoid: false,

	persistent: {
		'web_merchitemgro' : {
			primarykeys: ['merchitemgro_id'],
			comment: 'Daftar Group Merchandise',
			data: {
				merchitemgro_id: {text:'ID', type: dbtype.varchar(30), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				merchitemgro_name: {text:'Category Name', type: dbtype.varchar(90), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Site harus diisi'}},
				merchitemgro_descr: {text:'Description', type: dbtype.varchar(255), null:false},

				gender_id: { 
					text: 'Gender', type: dbtype.varchar(7), uppercase: true, null: true,   suppresslist: true,
					options: { prompt: 'NONE' },
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
			defaultsearch : ['merchitemgro_id', 'merchitemgro_name'],
			uniques: {
				'merchitemgro_name' : ['cluster_id', 'merchitemgro_name']
			}
		}

	},


	schema: {
		title: 'Merchandise Groups',
		header: 'web_merchitemgro',
		detils: {
		}
	}

	
}
