'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Syn TBInv",
	autoid: false,

	persistent: {
		'sync_tbinvsum' : {
			primarykeys: ['tbinvsum_id'],
			comment: 'Sync TV InvSum',
			data: {
				tbinvsum_id: {text:'ID', type: dbtype.varchar(16), null:false},
				block: {text:'BLOCK', type: dbtype.varchar(5)},
				dt: {text:'dt', type: dbtype.date, null:false},
				region_id: {text:'region_id', type: dbtype.varchar(5)},
				branch_id: {text:'branch_id', type: dbtype.varchar(7)},
				heinv_id: {text:'heinv_id', type: dbtype.varchar(13)},
				heinv_art: {text:'heinv_art', type: dbtype.varchar(30), suppresslist: true},
				heinv_mat: {text:'heinv_mat', type: dbtype.varchar(30), suppresslist: true},
				heinv_col: {text:'heinv_col', type: dbtype.varchar(30), suppresslist: true},
				heinv_iskonsinyasi: {text:'heinv_iskonsinyasi', type: dbtype.boolean, null:false, default: '0', suppresslist: true},
				heinv_priceori: { text: 'heinv_priceori', type: dbtype.decimal(18,0), null:false, default:0, suppresslist: true},
				heinv_priceadj: { text: 'heinv_priceadj', type: dbtype.decimal(18,0), null:false, default:0, suppresslist: true},
				heinv_pricegross: { text: 'heinv_pricegross', type: dbtype.decimal(18,0), null:false, default:0, suppresslist: true},
				heinv_price: { text: 'heinv_price', type: dbtype.decimal(18,0), null:false, default:0, suppresslist: true},
				heinv_pricedisc: { text: 'heinv_pricedisc', type: dbtype.decimal(3,0), null:false, default:0, suppresslist: true},
				heinv_pricenett: { text: 'heinv_pricenett', type: dbtype.decimal(18,0), null:false, default:0, suppresslist: true},
				gtype: {text:'gtype', type: dbtype.varchar(1), suppresslist: true},
				season_group: {text:'season_group', type: dbtype.varchar(10), suppresslist: true},
				season_id: {text:'season_id', type: dbtype.varchar(10), suppresslist: true},
				rvid: {text:'season_id', type: dbtype.varchar(30), suppresslist: true},
				rvdt: {text:'rvdt', type: dbtype.date, null:false, suppresslist: true},
				rvqty: { text: 'rvqty', type: dbtype.int(4), null:false, default:0, suppresslist: true},
				age: { text: 'age', type: dbtype.int(4), null:false, default:0, suppresslist: true},
				heinvctg_id: {text:'heinvctg_id', type: dbtype.varchar(10), suppresslist: true},
				heinvctg_name: {text:'heinvctg_name', type: dbtype.varchar(50), suppresslist: true},
				heinvctg_class: {text:'heinvctg_class', type: dbtype.varchar(30), suppresslist: true},
				heinvctg_gender: {text:'heinvctg_gender', type: dbtype.varchar(1), suppresslist: true},
				heinvctg_sizetag: {text:'heinvctg_sizetag', type: dbtype.varchar(5), suppresslist: true},
				heinvgro_id: {text:'heinvgro_id', type: dbtype.varchar(10), suppresslist: true},

				heinv_group1: {text:'heinv_group1', type: dbtype.varchar(60), suppresslist: true},
				heinv_group2: {text:'heinv_group2', type: dbtype.varchar(60), suppresslist: true},
				heinv_gender: {text:'heinv_gender', type: dbtype.varchar(1), suppresslist: true},
				heinv_color1: {text:'heinv_color1', type: dbtype.varchar(30), suppresslist: true},
				heinv_color2: {text:'heinv_color2', type: dbtype.varchar(30), suppresslist: true},
				heinv_color3: {text:'heinv_color3', type: dbtype.varchar(30), suppresslist: true},
				heinv_hscode_ship: {text:'heinv_hscode_ship', type: dbtype.varchar(30), suppresslist: true},
				heinv_hscode_ina: {text:'heinv_hscode_ina', type: dbtype.varchar(30), suppresslist: true},
				heinv_plbname: {text:'heinv_plbname', type: dbtype.varchar(100), suppresslist: true},
				ref_id: {text:'ref_id', type: dbtype.varchar(30), suppresslist: true},
				invcls_id: {text:'invcls_id', type: dbtype.varchar(8), suppresslist: true},

				heinv_isweb: {text:'heinv_isweb', type: dbtype.boolean, null:false, default: '0', suppresslist: true},
				heinv_weight: { text: 'heinv_weight', type: dbtype.decimal(5,2), null:false, default:0, suppresslist: true},
				heinv_length: { text: 'heinv_length', type: dbtype.decimal(5,2), null:false, default:0, suppresslist: true},
				heinv_width: { text: 'heinv_width', type: dbtype.decimal(5,2), null:false, default:0, suppresslist: true},
				heinv_height: { text: 'heinv_height', type: dbtype.decimal(5,2), null:false, default:0, suppresslist: true},
				heinv_webdescr: {text:'heinv_webdescr', type: dbtype.varchar(255), suppresslist: true},

				heinv_other1: {text:'heinv_other1', type: dbtype.varchar(50), suppresslist: true},
				heinv_other2: {text:'heinv_other2', type: dbtype.varchar(50), suppresslist: true},
				heinv_other3: {text:'heinv_other3', type: dbtype.varchar(50), suppresslist: true},
				heinv_other4: {text:'heinv_other4', type: dbtype.varchar(50), suppresslist: true},
				heinv_other5: {text:'heinv_other5', type: dbtype.varchar(50), suppresslist: true},

				heinv_produk: {text:'heinv_produk', type: dbtype.varchar(50), suppresslist: true},
				heinv_bahan: {text:'heinv_bahan', type: dbtype.varchar(70), suppresslist: true},
				heinv_pemeliharaan: {text:'heinv_pemeliharaan', type: dbtype.varchar(100), suppresslist: true},
				heinv_logo: {text:'heinv_logo', type: dbtype.varchar(30), suppresslist: true},
				heinv_dibuatdi: {text:'heinv_dibuatdi', type: dbtype.varchar(30), suppresslist: true},

				heinv_modifydate: {text:'heinv_modifydate', type: dbtype.varchar(30), suppresslist: true},

				lastcost: { text: 'lastcost', type: dbtype.decimal(18,0), null:false, default:0, suppresslist: true},
				lastcostid: {text:'lastcostid', type: dbtype.varchar(30), suppresslist: true},
				lastcostdt: {text:'lastcostdt', type: dbtype.date, null:false, suppresslist: true},
				lastpriceid: {text:'lastpriceid', type: dbtype.varchar(30), suppresslist: true},
				lastpricedt: {text:'lastpricedt', type: dbtype.date, null:false, suppresslist: true},



				beg: { text: 'beg', type: dbtype.int(4), null:false, default:0, suppresslist: true},
				rv: { text: 'rv', type: dbtype.int(4), null:false, default:0, suppresslist: true},
				tin: { text: 'tin', type: dbtype.int(4), null:false, default:0, suppresslist: true},
				tout: { text: 'tout', type: dbtype.int(4), null:false, default:0, suppresslist: true},
				sl: { text: 'sl', type: dbtype.int(4), null:false, default:0, suppresslist: true},
				do: { text: 'do', type: dbtype.int(4), null:false, default:0, suppresslist: true},
				aj: { text: 'aj', type: dbtype.int(4), null:false, default:0, suppresslist: true},
				end: { text: 'end', type: dbtype.int(4), null:false, default:0, suppresslist: true},
				tts: { text: 'tts', type: dbtype.int(4), null:false, default:0, suppresslist: true},

				C01: { text: 'C01', type: dbtype.int(4), null:false, default:0, suppresslist: true},
				C02: { text: 'C02', type: dbtype.int(4), null:false, default:0, suppresslist: true},
				C03: { text: 'C03', type: dbtype.int(4), null:false, default:0, suppresslist: true},
				C04: { text: 'C04', type: dbtype.int(4), null:false, default:0, suppresslist: true},
				C05: { text: 'C05', type: dbtype.int(4), null:false, default:0, suppresslist: true},
				C06: { text: 'C06', type: dbtype.int(4), null:false, default:0, suppresslist: true},
				C07: { text: 'C07', type: dbtype.int(4), null:false, default:0, suppresslist: true},
				C08: { text: 'C08', type: dbtype.int(4), null:false, default:0, suppresslist: true},
				C09: { text: 'C09', type: dbtype.int(4), null:false, default:0, suppresslist: true},
				C10: { text: 'C10', type: dbtype.int(4), null:false, default:0, suppresslist: true},
				C11: { text: 'C11', type: dbtype.int(4), null:false, default:0, suppresslist: true},
				C12: { text: 'C12', type: dbtype.int(4), null:false, default:0, suppresslist: true},
				C13: { text: 'C13', type: dbtype.int(4), null:false, default:0, suppresslist: true},
				C14: { text: 'C14', type: dbtype.int(4), null:false, default:0, suppresslist: true},
				C15: { text: 'C15', type: dbtype.int(4), null:false, default:0, suppresslist: true},
				C16: { text: 'C16', type: dbtype.int(4), null:false, default:0, suppresslist: true},
				C17: { text: 'C17', type: dbtype.int(4), null:false, default:0, suppresslist: true},
				C18: { text: 'C18', type: dbtype.int(4), null:false, default:0, suppresslist: true},
				C19: { text: 'C19', type: dbtype.int(4), null:false, default:0, suppresslist: true},
				C20: { text: 'C20', type: dbtype.int(4), null:false, default:0, suppresslist: true},
				C21: { text: 'C21', type: dbtype.int(4), null:false, default:0, suppresslist: true},
				C22: { text: 'C22', type: dbtype.int(4), null:false, default:0, suppresslist: true},
				C23: { text: 'C23', type: dbtype.int(4), null:false, default:0, suppresslist: true},
				C24: { text: 'C24', type: dbtype.int(4), null:false, default:0, suppresslist: true},
				C25: { text: 'C25', type: dbtype.int(4), null:false, default:0, suppresslist: true},
				
			},

			defaultsearch : ['heinv_id'],

			uniques: {
				'tbinvsum_pair' : ['block', 'dt', 'region_id', 'branch_id', 'heinv_id']
			}


		},
	},

	schema: {
		title: 'Syn TBInv',
		header: 'sync_tbinvsum',
		detils: {}
	}
}



