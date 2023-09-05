'use strict'

// data.menuhead_showindropdown = 1;
// data.menuhead_showinaccordion = 1;

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Files",
	autoid: true,

	persistent: {
		'web_file' : {
			primarykeys: ['file_id'],
			comment: 'Daftar File',
			data: {
				file_id: {text:'ID', type: dbtype.varchar(14), null:false},	
				file_name: {text:'Name', type: dbtype.varchar(60), null:false, options: {required:true,invalidMessage:'Text menu harus diisi'}},	
				file_data: {text:'Data', type: dbtype.varchar(60)},	
			},

			defaultsearch: ['file_id', 'file_name'],
			uniques: {
				'file_name' : ['file_name']
			}
		}
	},


	schema: {
		title: 'Files',
		header: 'web_file',
		detils: {
		}
	}

}