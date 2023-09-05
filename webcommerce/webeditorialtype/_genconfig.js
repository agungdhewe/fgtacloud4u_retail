'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Editorial Type",
	autoid: false,

	persistent: {
		'web_editorialtype' : {
			primarykeys: ['editorialtype_id'],
			comment: 'Master Tipe Editorial',
			data: {
				editorialtype_id: {text:'ID', type: dbtype.varchar(7), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				editorialtype_name: {text:'Tipe Editorial', type: dbtype.varchar(30), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Tipe Editorial harus diisi'}},
				editorialtype_order: {text:'Order', type: dbtype.int(4), null:false, default:'0', suppresslist: true},
			},

			defaultsearch : ['editorialtype_id', 'editorialtype_name'],

			uniques: {
				'editorialtype_name' : ['editorialtype_name']
			},

			values: [
				{editorialtype_id:'N', editorialtype_name:'NEWS', editorialtype_order:'2'},
				{editorialtype_id:'C', editorialtype_name:'CAMPAIGN', editorialtype_order:'1'},
				{editorialtype_id:'A', editorialtype_name:'ARTICLES', editorialtype_order:'3'},
			],			
		}
	},

	schema: {
		title: 'Editorial Type',
		header: 'web_editorialtype',
		detils: {}
	}
}

