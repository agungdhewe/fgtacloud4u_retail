'use strict'

// data.menuhead_showindropdown = 1;
// data.menuhead_showinaccordion = 1;

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Menu Header",
	autoid: true,

	persistent: {
		'web_menuhead' : {
			primarykeys: ['menuhead_id'],
			comment: 'Daftar Menu yang muncul di header',
			data: {
				menuhead_id: {text:'ID', type: dbtype.varchar(14), null:false},	
				menuhead_text: {text:'Text', type: dbtype.varchar(60), null:false, options: {required:true,invalidMessage:'Text menu harus diisi'}},	
				menuhead_notes: {text:'Note', type: dbtype.varchar(255), null:true, suppresslist: true},	
				menuhead_url: {text:'URL', type: dbtype.varchar(255), null:false, options: {required:true,invalidMessage:"URL menu harus diisi, untuk group bisa diisi dengan -"}},
				menuhead_order: {text:'Order', type: dbtype.int(4), null:false, default:'0', suppresslist: true},
				menuhead_target: {text:'Target', type: dbtype.varchar(30), null:true, suppresslist: true},
				menuhead_isdisabled: {text:'Disabled', type: dbtype.boolean, null:false, default:'0'},
				menuhead_showindropdown: {text:'Dropdown', type: dbtype.boolean, null:false, default:'1', suppresslist: true},
				menuhead_showinaccordion: {text:'Accordion', type: dbtype.boolean, null:false, default:'1', suppresslist: true},
				menuhead_isparent: {text:'Parent', type: dbtype.boolean, null:false, default:'0', suppresslist: true},
				menuhead_parent: {
					text: 'Parent', type: dbtype.varchar(14), null: true, uppercase: true, suppresslist: true,
					options: { prompt: '-- PILIH --' },
					comp: comp.Combo({
						table: 'web_menuhead',
						field_value: 'menuhead_id',
						field_display: 'menuhead_text',
						field_display_name: 'menuhead_parent_name',
						api: 'retail/webcommerce/webmenuhead/list'
					})
				},				
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

			defaultsearch: ['menuhead_text', 'menuhead_notes'],
			uniques: {
				'menuhead_text' : ['menuhead_text']
			}
		}
	},


	schema: {
		title: 'Menu Header',
		header: 'web_menuhead',
		detils: {
		}
	}

}