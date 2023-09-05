'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Site",
	autoid: false,

	persistent: {
		'web_site' : {
			primarykeys: ['site_id'],
			comment: 'Daftar Site',
			data: {
				site_id: {text:'ID', type: dbtype.varchar(30), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				site_name: {text:'Site Name', type: dbtype.varchar(90), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Site harus diisi'}},
				site_address1: {
					text:'Address-1', type: dbtype.varchar(250), null:false, suppresslist: true, options:{required:true,invalidMessage:'Alamat harus diisi'},
					tips: 'lokasi unit di gedung, misalnya GF blok 1 no 1',
					tipstype: 'visible'	
				},
				site_address2: {
					text:'Address-2', type: dbtype.varchar(250), null:false, suppresslist: true,
					tips: 'Alamat Jalan',
					tipstype: 'visible'					
				},
				site_address3: {
					text:'Address-3', type: dbtype.varchar(250), null:false, suppresslist: true,
					tips: 'Kota, kodepos',
					tipstype: 'visible'	
				},	
				site_phone: {text:'Phone', type: dbtype.varchar(30), null:false, uppercase: true, suppresslist: true},	
				site_contact: {text:'Contact', type: dbtype.varchar(150), null:false, uppercase: true, suppresslist: true},				
				site_isdisabled: {text:'Disabled', type: dbtype.boolean, null:false, default:'0', suppresslist: true},
				site_geoloc: {text:'Geo Location', type: dbtype.varchar(30), null:false, suppresslist: true, default:"''"},
				site_order: {text:'Order', type: dbtype.int(4), null:false, default:'0', suppresslist: true},
				site_mainpic: {text:'Picture', type: dbtype.varchar(90), suppresslist: true, comp: comp.Filebox(), options: { accept: 'image/*' }},

				city_id: {
					suppresslist: true,
					options:{required:true,invalidMessage:'City harus diisi', prompt:'-- PILIH --'},
					text:'City', type: dbtype.varchar(30), null:false, 
					comp: comp.Combo({
						table: 'web_city', 
						field_value: 'city_id', field_display: 'city_name', 
						api: 'retail/webcommerce/webcity/list'})
				},

				cluster_id: { 
					text: 'Cluster', type: dbtype.varchar(10), uppercase: true, null: false,   suppresslist: true,
					options: { required: true, invalidMessage: 'Cluster harus diisi' }, 
					comp: comp.Combo({
						table: 'web_cluster',
						field_value: 'cluster_id', field_display: 'cluster_name',
						api: 'retail/webcommerce/webcluster/list'
					})
				}				
			},
			defaultsearch : ['site_id', 'site_name'],
			uniques: {
				'site_name' : ['cluster_id', 'site_name']
			}
		},

		'web_sitepic' : {
			primarykeys: ['sitepic_id'],
			comment: 'Daftar Picture',
			data: {
				sitepic_id: {text:'ID', type: dbtype.varchar(14), null:false},	
				sitepic_descr: {text:'Descr', type: dbtype.varchar(90), null:false, options: {required:true,invalidMessage:'Text menu harus diisi'}},	
				sitepic_order: {text:'Order', type: dbtype.int(4), null:false, default:'0', suppresslist: true},
				sitepic_file: {text:'Picture', type: dbtype.varchar(90), suppresslist: true,  comp: comp.Filebox(), options: { accept: 'image/*' }},
				site_id: {text:'Site', type: dbtype.varchar(14), null:false},	
			},
			defaultsearch: ['sitepic_id', 'sitepic_descr'],
			uniques: {}
		},		
	},

	schema: {
		title: 'Site',
		header: 'web_site',
		detils: {
			'picture': {title: 'Pictures', table: 'web_sitepic', form: true, headerview: 'site_name' }
		}

	}
}

/*
tampilan city pakai flex:
https://codepen.io/townivan/post/flexbox-flex-direction-column

*/
