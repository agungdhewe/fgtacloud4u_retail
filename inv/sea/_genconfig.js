'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Season",
	autoid: false,

	
	persistent: {
		'mst_sea' : {
			primarykeys: ['sea_id'],
			comment: 'Daftar Season',
			data: {
				sea_id: {text:'ID', type: dbtype.varchar(10), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				sea_name: {text:'Season', type: dbtype.varchar(90), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Season harus diisi'}},
				sea_year: {text:'Year', type: dbtype.int(4), null:false},
				sea_isdisabled: {text:'Disabled', type: dbtype.boolean, null:false, default:'0'},
				sea_datestart: {text:'Start', type: dbtype.date, null:false, suppresslist: true},
				sea_dateend: {text:'End', type: dbtype.date, null:false, suppresslist: true},
				seagroup_id: {
					text:'Season Group', type: dbtype.varchar(2), null:false, 
					options:{required:true,invalidMessage:'Group Season harus diisi'},
					comp: comp.Combo({
						table: 'mst_seagroup', 
						field_value: 'seagroup_id', field_display: 'seagroup_name', 
						api: 'retail/inv/seagroup/list'})
				}				
			}
		},
	},

	schema: {
		title: 'Season',
		header: 'mst_sea',
		detils: {}
	}
}



