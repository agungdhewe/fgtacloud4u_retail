'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Menu Visibility",
	autoid: true,

	persistent: {
		'web_menuvisibility' : {
			primarykeys: ['menuvisibility_id'],
			comment: 'Visibility Menu',
			data: {
				menuvisibility_id: {text:'ID', type: dbtype.varchar(1), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},	
				menuvisibility_name: {text:'Text', type: dbtype.varchar(30), null:false, uppercase: true, options:{required:true,invalidMessage:'Name harus diisi'}},
			},

			defaultsearch: ['menuvisibility_id', 'menuvisibility_name'],
			uniques: {
				'menuvisibility_name' : ['menuvisibility_name']
			},
			values: [
				{menuvisibility_id:'A', menuvisibility_name:'ALWAYS'},
				{menuvisibility_id:'I', menuvisibility_name:'AFTER SIGNIN'},
				{menuvisibility_id:'O', menuvisibility_name:'BEFORE SIGNIN'},
			]
		}
	},


	schema: {
		title: 'Menu Visibility',
		header: 'web_menuvisibility',
		detils: {
		}
	}

}