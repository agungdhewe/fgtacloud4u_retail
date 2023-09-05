'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Cluster",
	autoid: false,

	persistent: {
		'web_cluster' : {
			primarykeys: ['cluster_id'],
			comment: 'Daftar Cluster',
			data: {
				cluster_id: {text:'ID', type: dbtype.varchar(10), null:false, uppercase: true},
				cluster_name: {text:'Name', type: dbtype.varchar(60), null:false, uppercase: true, options: {required:true,invalidMessage:'Nama cluster harus diisi'}},
			},
			defaultsearch : ['cluster_id', 'cluster_name'],
			uniques: {
				'cluster_name' : ['cluster_name']
			},
			values: [
				{cluster_id:'FLA', cluster_name: 'FURLA WEB'},
				{cluster_id:'GEX', cluster_name: 'GEOX WEB'},
				{cluster_id:'HBS', cluster_name: 'HUGOBOSS WEB'},
				{cluster_id:'FRG', cluster_name: 'FERRAGAMO WEB'}
			]
		},

		'web_clusterbrand' : {
			primarykeys: ['clusterbrand_id'],
			comment: 'Daftar brand yang dimiliki cluster',
			data: {
				clusterbrand_id: {text:'ID', type: dbtype.varchar(14), null:false, uppercase: true},
				brand_id: { 
					text: 'Brand', type: dbtype.varchar(10), uppercase: true, null: false, 
					options: { required: true, invalidMessage: 'Brand harus diisi' }, 
					comp: comp.Combo({
						table: 'web_brand',
						field_value: 'brand_id', field_display: 'brand_name',
						api: 'retail/webcommerce/webbrand/list'
					})
				},				
				cluster_id: {text:'Cluster', type: dbtype.varchar(10), null:false, uppercase: true},
			},
			values: [
				{clusterbrand_id:'FLA01',  brand_id:'FLA', cluster_id:'FLA'},
				{clusterbrand_id:'GEX01',  brand_id:'GEX', cluster_id:'GEX'},
				{clusterbrand_id:'HBS01',  brand_id:'HBS', cluster_id:'HBS'},
				{clusterbrand_id:'FRG01',  brand_id:'FRG', cluster_id:'FRG'},
			]
		}
	},

	schema: {
		title: 'Brand',
		header: 'web_cluster',
		detils: {
			'brand' : {title: 'Brand', table:'web_clusterbrand', form: true, headerview:'cluster_name'},
		}
	}
}
