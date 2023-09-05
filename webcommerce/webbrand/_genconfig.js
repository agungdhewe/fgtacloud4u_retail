'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Brand",
	autoid: false,

	persistent: {
		'web_brand' : {
			primarykeys: ['brand_id'],
			comment: 'Daftar Brand',
			data: {
				brand_id: {text:'ID', type: dbtype.varchar(10), null:false, uppercase: true},
				brand_name: {text:'Brand', type: dbtype.varchar(60), null:false, uppercase: true},
				brand_descr: {text:'Descr', type: dbtype.varchar(90), null:true, suppresslist: true},
				brand_isdisabled: {text:'Disabled', type: dbtype.boolean, null:false, default:'0'},
			},

			defaultsearch : ['brand_id', 'brand_name'],

			uniques: {
				'brand_name' : ['brand_name']
			},

			values: [
				{brand_id:'HBS', brand_name:'HUGOBOSS'},
				{brand_id:'CAN', brand_name:'CANALI'},
				{brand_id:'GEX', brand_name:'GEOX'},
				{brand_id:'EAG', brand_name:'AIGNER'},
				{brand_id:'FLA', brand_name:'FURLA'},
				{brand_id:'FRG', brand_name:'FERRAGAMO'},
				{brand_id:'FKP', brand_name:'FIND KAPOOR'},
				{brand_id:'TOD', brand_name:'TODS'},
			]


		}
	},

	schema: {
		title: 'Brand',
		header: 'web_brand',
		detils: {
		}
	}
}



