'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Properties Type",
	autoid: false,

	persistent: {
		'web_webproptype' : {
			primarykeys: ['webproptype_id'],
			comment: 'Master Data Properties Type',
			data: {
				webproptype_id: {text:'ID', type: dbtype.varchar(20), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				webproptype_name: {text:'Nama', type: dbtype.varchar(30), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Tipe Properti harus diisi'}},
				webproptype_group: {text:'Group', type: dbtype.varchar(20), null:false, uppercase: true},
			},

			defaultsearch : ['webproptype_id', 'webproptype_name'],

			uniques: {
				'webproptype_name' : ['webproptype_name']
			}			
		}
	},

	schema: {
		title: 'P',
		header: 'web_webproptype',
		detils: {}
	}
	
}

