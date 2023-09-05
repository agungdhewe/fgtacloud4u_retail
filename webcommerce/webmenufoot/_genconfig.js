'use strict'

// data.menuhead_showindropdown = 1;
// data.menuhead_showinaccordion = 1;

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Menu Footer",
	autoid: true,

	persistent: {
		'web_menufoot' : {
			primarykeys: ['menufoot_id'],
			comment: 'Daftar Menu yang muncul di footer',
			data: {
				menufoot_id: {text:'ID', type: dbtype.varchar(14), null:false},	
				menufoot_text: {text:'Text', type: dbtype.varchar(60), null:false, options: {required:true,invalidMessage:'Text menu harus diisi'}},	
				menufoot_notes: {text:'Note', type: dbtype.varchar(255), null:true, suppresslist: true},	
				menufoot_url: {text:'URL', type: dbtype.varchar(255), null:false, options: {required:true,invalidMessage:"URL menu harus diisi, untuk group bisa diisi dengan -"}},
				menufoot_order: {text:'Order', type: dbtype.int(4), null:false, default:'0', suppresslist: true},
				menufoot_target: {text:'Target', type: dbtype.varchar(30), null:true, suppresslist: true},
				menufoot_isdisabled: {text:'Disabled', type: dbtype.boolean, null:false, default:'0'},
				menuvisibility_id: {
					text:'Visibility', type: dbtype.varchar(1), null:false, suppresslist: true,
					options:{required:true,invalidMessage:'Visibility harus diisi', prompt:'-- PILIH --'},
					initialvalue: {id:'A', display:'ALWAYS'},
					comp: comp.Combo({
						table: 'web_menuvisibility', 
						field_value: 'menuvisibility_id', field_display: 'menuvisibility_name', 
						api: 'retail/webcommerce/webmenuvisibility/list'})					
				},
				cluster_id: { 
					text: 'Cluster', type: dbtype.varchar(10), uppercase: true, null: false,   suppresslist: true,
					options: { required: true, invalidMessage: 'Cluster harus diisi' }, 
					comp: comp.Combo({
						table: 'web_cluster',
						field_value: 'cluster_id', field_display: 'cluster_name',
						api: 'retail/webcommerce/webcluster/list'
					})
				},					
			},

			defaultsearch: ['menufoot_text', 'menufoot_notes'],
			uniques: {
				'menufoot_text' : ['menufoot_text']
			}
		}
	},


	schema: {
		title: 'Menu Footer',
		header: 'web_menufoot',
		detils: {
		}
	}

}