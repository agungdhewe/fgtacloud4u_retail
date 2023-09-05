'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Preference Type",
	autoid: false,

	persistent: {
		'web_preftype' : {
			primarykeys: ['preftype_id'],
			comment: 'Daftar Tipe Preference',
			data: {
				preftype_id: {text:'ID', type: dbtype.varchar(5), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}}, 
				preftype_name: {text:'Preference Type', type: dbtype.varchar(90), null:false, uppercase: true, options:{required:true,invalidMessage:'Type Preference harus diisi'}},
			},
			defaultsearch : ['preftype_id', 'preftype_name'],
			uniques: {
				'preftype_name' : ['preftype_name']
			}			
		},
	},

	schema: {
		title: 'Preference Type',
		header: 'web_preftype',
		detils: {
		}
	}

}