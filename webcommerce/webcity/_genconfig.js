'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "City",
	autoid: false,

	persistent: {
		'web_city' : {
			primarykeys: ['city_id'],
			comment: 'Daftar City',
			data: {
				city_id: {text:'ID', type: dbtype.varchar(30), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				city_name: {text:'City Name', type: dbtype.varchar(60), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Kota harus diisi'}},
				city_order: {text:'Order', type: dbtype.int(4), null:false, default:'0', suppresslist: true},
				city_isdisabled: {text:'Disabled', type: dbtype.boolean, null:false, default:'0'},
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

			defaultsearch : ['city_id', 'city_name'],
			uniques: {
				'city_name' : ['city_name']
			},

			values: [
				{city_id:'JKT', city_name:'JAKARTA', city_order:'10', cluster_id:'FLA'},
				{city_id:'BDG', city_name:'BANDUNG', city_order:'20', cluster_id:'FLA'},
				{city_id:'SBY', city_name:'SURABAYA', city_order:'30', cluster_id:'FLA'},
				{city_id:'MKS', city_name:'MAKASSAR', city_order:'40', cluster_id:'FLA'},
			],			
		}
	},

	schema: {
		title: 'City',
		header: 'web_city',
		detils: {}
	}
}

