'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Season Group",
	autoid: false,

	persistent: {
		'web_seagroup' : {
			primarykeys: ['seagroup_id'],
			comment: 'Daftar Season Group',
			data: {
				seagroup_id: {text:'ID', type: dbtype.varchar(2), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				seagroup_name: {text:'Season Group Name', type: dbtype.varchar(30), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Group Season harus diisi'}},
			},

			defaultsearch : ['seagroup_id', 'seagroup_name'],
			uniques: {
				'seagroup_name' : ['seagroup_name']
			},

			values: [
				{seagroup_id:'PF', seagroup_name:'PRE FALL'},
				{seagroup_id:'FW', seagroup_name:'FALL WINTER'},
				{seagroup_id:'SS', seagroup_name:'SPRING SUMMER'},
				{seagroup_id:'PS', seagroup_name:'PRE SPRING'},
			],			
		}
	},

	schema: {
		title: 'Season Group',
		header: 'web_seagroup',
		detils: {}
	}
}

