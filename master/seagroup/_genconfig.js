'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Season Group",
	autoid: false,

	persistent: {
		'mst_seagroup' : {
			primarykeys: ['seagroup_id'],
			comment: 'Daftar Group Season',
			data: {
				seagroup_id: {text:'ID', type: dbtype.varchar(10), null:false, uppercase: true},
				seagroup_name: {text: 'Season Group', type: dbtype.varchar(90), null:false, uppercase: true,  options:{required:true,invalidMessage:'Nama Group harus diisi'}}
			},
			
			uniques : {
				'seagroup_name': ['seagroup_name']
			},

			values: [
				{seagroup_id: 'FW', seagroup_name: 'FW'},
				{seagroup_id: 'SS', seagroup_name: 'SS'},
			]
		}
	},
	
	schema: {
		title: 'Season Group',
		header: 'mst_seagroup',
		detils: {}
	}
}		