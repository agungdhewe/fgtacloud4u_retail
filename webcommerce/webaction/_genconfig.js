'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Action",
	autoid: false,

	persistent: {
		'web_action' : {
			primarykeys: ['action_id'],
			comment: 'Daftar Action',
			data: {
				action_id: {text:'ID', type: dbtype.varchar(10), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}}, 
				action_name: {text:'Action', type: dbtype.varchar(90), null:false, uppercase: true, options:{required:true,invalidMessage:'Action harus diisi'}},
			},
			defaultsearch : ['action_id', 'action_name'],
			uniques: {
				'action_name' : ['action_name']
			}			
		},
	},

	schema: {
		title: 'Action',
		header: 'web_action',
		detils: {
		}
	}

}