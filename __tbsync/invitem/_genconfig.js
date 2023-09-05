'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Syn TBInvItem",
	autoid: false,

	persistent: {
		'sync_tbinvitem' : {
			primarykeys: ['tbinvitem_id'],
			comment: 'Sync TV inv item',
			data: {
				tbinvitem_id: {text:'ID', type: dbtype.varchar(16), null:false},
				region_id: {text:'region_id', type: dbtype.varchar(5)},
				heinv_id: {text:'heinv_id', type: dbtype.varchar(13)},
				heinvitem_line: { text: 'heinvitem_line', type: dbtype.int(4), null:false, default:0},
				heinvitem_id: {text:'heinvitem_id', type: dbtype.varchar(13)},
				heinvitem_size: {text:'heinvitem_size', type: dbtype.varchar(50), suppresslist: true},
				heinvitem_colnum: {text:'heinvitem_colnum', type: dbtype.varchar(3), suppresslist: true},
				heinvitem_barcode: {text:'heinvitem_barcode', type: dbtype.varchar(30), suppresslist: true},
			},

			defaultsearch : ['heinv_id', 'heinvitem_barcode'],

			uniques: {
				'heinvitem_barcode' : ['heinvitem_barcode', 'region_id'],
				'heinvitem_id' : ['heinv_id', 'heinvitem_line']
			}


		},
	},

	schema: {
		title: 'Syn TBInv Item',
		header: 'sync_tbinvitem',
		detils: {}
	}
}



