'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Merch RV",
	autoid: true,
	printing: true,	
	committer: true,
	jsonOverwrite: false,
	commitOverwrite: true,
	uncommitOverwrite: true,
	approvalOverwrite: false,

	
	persistent: {
		'trn_merchrv' : {
			comment: 'Daftar Receiving Dokumen',
			primarykeys: ['merchrv_id'],
			data: {
				merchrv_id: {text:'RV', type: dbtype.varchar(30), null:false},		

				unit_id: {
					text: 'Unit', type: dbtype.varchar(30), null: true, suppresslist: true, 
					options: { required: true, invalidMessage: 'Unit harus diisi' }, 
					comp: comp.Combo({
						title: 'Pilih Unit',
						table: 'mst_unit',
						field_value: 'unit_id', field_display: 'unit_name',
						api: 'ent/organisation/unit/list',
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: false
					})
				},

				merchship_id: {
					text: 'Shipment', type: dbtype.varchar(30), null: true, suppresslist: true, 
					options: { required: true, invalidMessage: 'Shipment harus diisi' }, 
					comp: comp.Combo({
						title: 'Pilih Shipment',
						table: 'trn_merchship',
						field_value: 'merchship_id', field_display: 'merchship_descr',
						api: 'retail/merch/merchship/list',
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: false
					})
				},

				merchrv_ref: {
					text:'Ref', type: dbtype.varchar(30), null:true, suppresslist: true,
					options:{required:true,invalidMessage:'Referensi RV harus diisi'},
					tips:'no dokumen PL Shipment',
					tipstype:'visible'
				},

				merchrv_date: {text:'Date ETA', type: dbtype.date, null:false, suppresslist: true},
				merchrv_descr: {text:'Descr', type: dbtype.varchar(255), null:true},				

				periodemo_id: { 
					text: 'Periode', type: dbtype.varchar(6), null: false, suppresslist: false, 
					options: { required: true, invalidMessage: 'Periode harus diisi' }, 
					comp: comp.Combo({
						title: 'Pilih Periode Buku',
						table: 'mst_periodemo',
						field_value: 'periodemo_id', field_display: 'periodemo_name',
						api: 'finact/master/periodemo/list',
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: false
					})				
				},

				merchrv_version: {text:'Doc Version', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options:{disabled:true}},
				merchrv_iscommit: {text:'Commit', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}},
				merchrv_commitby: {text:'CommitBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				merchrv_commitdate: {text:'CommitDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true},	

				merchrv_ispost: {text:'Post', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}},
				merchrv_postby: {text:'PostBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				merchrv_postdate: {text:'PostDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true},	

			}
		},

		'trn_merchrvitem' : {
			comment: 'Daftar Item Received',
			primarykeys: ['merchrvitem_id'],
			data: {
				merchrvitem_id: {text:'ID', type: dbtype.varchar(14), null:false},	
				merchitem_id: { 
					text: 'Item', type: dbtype.varchar(14), null: true, 
					options: { required: true, invalidMessage: 'Item harus diisi' }, 
					comp: comp.Combo({
						title: 'Pilih Item',
						table: 'mst_merchitem',
						field_value: 'merchitem_id', field_display: 'itemstock_id',
						api: 'retail/master/merchitem/list',
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: false
					})				
				},				

				merchitem_combo: {text:'Combo', type: dbtype.varchar(103), null:true},
				merchitem_name: {text:'Name', type: dbtype.varchar(255), null:true},
				merchrvitem_qtyinit: { text: 'Qty PL', type: dbtype.int(4), null:false, default:0},
				merchrvitem_qty: { text: 'Qty Actual', type: dbtype.int(4), null:false, default:0},
				merchrv_id: {text:'RV', type: dbtype.varchar(30), null:false},		
			}
		}
	},

	schema: {
		header: 'trn_merchrv',
		detils: {
			'items' : {
				title: 'Items', table: 'trn_merchrvitem', form: true, headerview: 'merchrv_descr' ,
				editorHandler: true, listHandler: true
			},
			'preview' : {
				title: 'Preview', table: 'trn_merchrvitem', form: false, genHandler: 'printpreview', 
				tabvisible: false,
				overwrite:{mjs:true, phtml:true}
			},
			'import' : {
				title: 'Import', table: 'trn_merchrvitem', form: false, 
				tabvisible: false,
				overwrite:{mjs:false, phtml:false}
			}

		},


	}	
}			

