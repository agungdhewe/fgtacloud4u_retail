'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Season",
	autoid: false,

	persistent: {
		'web_sea' : {
			primarykeys: ['sea_id'],
			comment: 'Daftar City',
			data: {
				sea_id: {text:'ID', type: dbtype.varchar(10), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				sea_name: {text:'Season Name', type: dbtype.varchar(60), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Season harus diisi'}},
				sea_year: {text:'Year', type: dbtype.int(4), null:false, default: 0, options:{required:true,invalidMessage:'Tahun harus diisi'}},
				sea_order: {text:'Order', type: dbtype.int(4), null:false, default: 0, options:{required:true,invalidMessage:'Tahun harus diisi'}},
				seagroup_id: { 
					text: 'Group Season', type: dbtype.varchar(10), uppercase: true, null: false,   suppresslist: true,
					options: { required: true, invalidMessage: 'Group harus diisi' }, 
					comp: comp.Combo({
						table: 'web_seagroup',
						field_value: 'seagroup_id', field_display: 'seagroup_name',
						api: 'retail/webcommerce/webseagroup/list'
					})
				},
				sea_map: {text:'Map to TB', type: dbtype.varchar(3), null:false},
			},

			defaultsearch : ['sea_id', 'sea_name'],
			uniques: {
				'sea_name' : ['sea_name']
			},

			values: [
				
			],			
		}
	},

	schema: {
		title: 'City',
		header: 'web_sea',
		detils: {}
	}
}

