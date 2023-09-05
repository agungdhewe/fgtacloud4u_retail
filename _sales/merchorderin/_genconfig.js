'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Merchandise Order In",
	autoid: true,
	icon : "icon-order-white.svg",
	backcolor : "#348183",
	idprefix: 'SO', 
	printing: true,	
	committer: true,
	// commiter_xtion: "",
	// uncommiter_xtion: "",
	approval: true,
	approval_xtion: "xtion-approve-merge",
	doc_id: 'ORDERIN',	

	persistent: {
		'trn_merchorderin': {
			comment: 'Daftar Order Masuk Merchandise',
			primarykeys: ['merchorderin_id'],
			data: {
				merchorderin_id: { text: 'ID', type: dbtype.varchar(30), null: false },
				unit_id: {
					text: 'Unit', type: dbtype.varchar(10), null: true, suppresslist: true, 
					options: { required: true, invalidMessage: 'Unit harus diisi'},
					comp: comp.Combo({
						table: 'mst_unit',
						field_value: 'unit_id', field_display: 'unit_name',
						api: 'ent/organisation/unit/list',
						OnSelectedScript: `
				console.log(record);	
				form.setValue(obj.cbo_owner_dept_id, record.dept_id, record.dept_name)			
						`
					})
				},

				owner_dept_id: {
					text: 'Item Owner Dept', type: dbtype.varchar(30), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Departemen harus diisi'},
					comp: comp.Combo({
						table: 'mst_dept',
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'owner_dept_name',
						api: 'ent/organisation/dept/list'
					})
				},


				partner_id: {
					text:'Partner', type: dbtype.varchar(30), null:true, suppresslist: true,
					options: { required: true, invalidMessage: 'Partner Harus diisi', disabled:false } ,
					comp: comp.Combo({
						table: 'mst_partner', 
						field_value: 'partner_id', field_display: 'partner_name',  field_display_name: 'partner_name',
						api: 'ent/affiliation/partner/list'
					})
				},


				merchquotout_id: {
					text:'Quotation', type: dbtype.varchar(30), null:true, suppresslist: true,
					options: { required: true, invalidMessage: 'Quotation Harus diisi', disabled:false } ,
					comp: comp.Combo({
						table: 'trn_merchquotout', 
						field_value: 'merchquotout_id', field_display: 'merchquotout_descr',  field_display_name: 'merchquotout_descr',
						api: 'retail/sales/merchquotout/list-selector'
					})
				},
				orderin_isunreferenced: {
					caption:'', text:'UnReferenced', type: dbtype.boolean, null:false, default:'0', suppresslist: true, options: {labelWidth: '300px'},
					handlers: {
						onChange: {
							params: 'newvalue, oldvalue',
							functionname: 'orderin_isunreferenced_changed'
						}
					} 
				},

				orderintype_id: {
					text:'Order Type', type: dbtype.varchar(10), null:true, suppresslist: true,
					options: { required: true, invalidMessage: 'Order Type Harus diisi', disabled:false } ,
					// options:{prompt:'NONE'},
					comp: comp.Combo({
						table: 'mst_orderintype', 
						field_value: 'orderintype_id', field_display: 'orderintype_name',  field_display_name: 'orderintype_name',
						api: 'finact/sales/orderintype/list'
					})
				},

				
				merchorderin_ref: { text: 'Ref', type: dbtype.varchar(90), null: true },
				merchorderin_descr: { text: 'Descr', type: dbtype.varchar(255), null: true,  options: { required: true, invalidMessage: 'Descr harus diisi' } },
				merchorderin_dt: {text:'Date', type: dbtype.date, null:false},
				merchorderin_dteta: {text:'Date ETA', type: dbtype.date, null:false, suppresslist: true},



				ae_empl_id: {
					text:'AE', type: dbtype.varchar(14), null:true, suppresslist: true,
					autobylogin: 'empl',
					options:{prompt:'NONE'},
					comp: comp.Combo({
						table: 'mst_empl', 
						field_value: 'empl_id', field_display: 'empl_name',  field_display_name: 'ae_empl_name',
						api: 'hrms/master/empl/list'})
				},	


				project_id: {
					text: 'Project', type: dbtype.varchar(30), null: true, suppresslist: true, 
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_project',
						field_value: 'project_id', field_display: 'project_name',
						api: 'finact/master/project/list'
					})
				},


				merchorderin_totalqty: { text: 'Total Qty', type: dbtype.int(5), null: false, default:0, options: { disabled: true} },
				merchorderin_total: { text: 'Total', type: dbtype.decimal(16,0), null: false, default:0, options: { disabled: true} },

				orderin_ishasdp: {
					section: section.Begin('Down Payment'),  //section.Begin('Related Dept', 'defbottomborder'),
					caption:'Down Payment', text:'have to pay downpayment', type: dbtype.boolean, null:false, default:'0', suppresslist: true, options: {labelWidth: '300px'}},
				orderin_dpvalue: { 
					section: section.End(),
					text: 'Value (%)', type: dbtype.decimal(4,2), null: false, default:0, suppresslist: true 
				},


				ppn_taxtype_id: { 
					section: section.Begin('Tax'),  //section.Begin('Related Dept', 'defbottomborder'),
					text: 'PPN', type: dbtype.varchar(10), null: true, suppresslist: true,
					options: { prompt: 'NONE' }, 
					comp: comp.Combo({
						table: 'mst_taxtype', 
						field_value: 'taxtype_id', field_display: 'taxtype_name', field_display_name: 'ppn_taxtype_name', 
						api: 'finact/master/taxtype/list'})				
				
				},
				ppn_taxvalue: { text: 'PPN Value (%)', type: dbtype.decimal(4,2), null: false, default:0, suppresslist: true, options: { disabled: true} },
				ppn_include: {
					section: section.End(),
					text:'PPN Include', type: dbtype.boolean, null:false, default:'0', suppresslist: true, options: { disabled: true}
				},



				arunbill_coa_id: { 
					section: section.Begin('Chart of Accounts'),  // , 'defbottomborder'
					text: 'COA AR Unbill', type: dbtype.varchar(17), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'AR harus diisi' }, 
					tips: '',
					tipstype: 'visible',
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'arunbill_coa_name', 
						api: 'finact/master/coa/list'})				
				
				},
				ar_coa_id: { 
					text: 'COA AR', type: dbtype.varchar(17), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'AR harus diisi' }, 
					tips: '',
					tipstype: 'visible',
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'ar_coa_name', 
						api: 'finact/master/coa/list'})				
				
				},

	
				dp_coa_id: { 
					text: 'COA Downpayment', type: dbtype.varchar(17), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'OrderIn COA Downpayment harus diisi' }, 
					tips: '',
					tipstype: 'visible',
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'dp_coa_name', 
						api: 'finact/master/coa/list'})				
				
				},

				sales_coa_id: { 
					text: 'COA Sales', type: dbtype.varchar(10), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'OrderIn Sales COA harus diisi' }, 
					tips: '',
					tipstype: 'visible',
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'sales_coa_name', 
						api: 'finact/master/coa/list'})				
				
				},	
				
				salesdisc_coa_id: { 
					text: 'COA Disc Sales', type: dbtype.varchar(10), null: true, suppresslist: true,
					options: { prompt: 'NONE' }, 
					tips: '',
					tipstype: 'visible',
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'salesdisc_coa_name', 
						api: 'finact/master/coa/list'})				
				},

				ppn_coa_id: { 
					text: 'COA PPN Payable', type: dbtype.varchar(10), null: true, suppresslist: true,
					options: { prompt: 'NONE' }, 
					tips: '',
					tipstype: 'visible',
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'ppn_coa_name', 
						api: 'finact/master/coa/list'})				
				},

				ppnsubsidi_coa_id: { 
					section: section.End(), 
					text: 'COA Subsidi PPN', type: dbtype.varchar(10), null: true, suppresslist: true,
					options: { prompt: 'NONE' }, 
					tips: 'Apabila PPN include COA ini perlu diisi',
					tipstype: 'visible',
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'ppnsubsidi_coa_name', 
						api: 'finact/master/coa/list'})				
				},




				merchorderin_totalitem: { 
					section: section.Begin('Amount Summary'),  // , 'defbottomborder'
					text: 'Total Item', type: dbtype.int(5), null: false, default:0, suppresslist: true, options: { disabled: true} 
				},
				merchorderin_salesgross: { text: 'Gross Sales', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				merchorderin_discount: { text: 'Dicount', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				merchorderin_subtotal: { text: 'Sub Total', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				merchorderin_pph: { text: 'PPh', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				merchorderin_nett: { text: 'Sales Nett', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				merchorderin_ppn: { text: 'PPN', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				merchorderin_totaladdcost: { text: 'Additional Cost', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				merchorderin_payment: { 
					section: section.End(), 
					text: 'Total Payment', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} 
				},


				merchorderin_estgp: { 
					section: section.Begin('Estimated Gross Profit', 'defbottomborder'), 
					text: 'GP', type: dbtype.decimal(14,0), null:false, default:0, suppresslist: true, options: {disabled: true}},
					merchorderin_estgppercent: { 
					section: section.End(),
					text: 'GP (%)', type: dbtype.decimal(5, 2), null:false, default:0, suppresslist: true, options: {disabled: true}},
	


				dept_id: {
					text: 'Dept', type: dbtype.varchar(30), null: false, suppresslist: true,
					autobylogin: 'dept',
					options: { required: true, invalidMessage: 'Departemen harus diisi'},
					comp: comp.Combo({
						table: 'mst_dept',
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'dept_name',
						api: 'ent/organisation/dept/list'
					})
				},

				trxmodel_id: { 
					text: 'Model Trx', type: dbtype.varchar(10), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Model Trx harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_trxmodel',
						field_value: 'trxmodel_id', field_display: 'trxmodel_name',
						api: 'finact/master/trxmodel/list'
					})				
				},

				doc_id: {
					text:'Doc', type: dbtype.varchar(30), null:false, suppresslist: true,
					options: {required:true, invalidMessage:'ID harus diisi', disabled: true },
					comp: comp.Combo({
						table: 'mst_doc',
						field_value: 'doc_id', field_display: 'doc_name', field_display_name: 'doc_name',
						api: 'ent/organisation/docs/list'
					})				
				},


		
				merchorderin_version: {text:'Doc Version', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options:{disabled:true}},
				merchorderin_iscommit: {text:'Commit', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}},
				merchorderin_commitby: {text:'CommitBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				merchorderin_commitdate: {text:'CommitDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true},	

				merchorderin_isapprovalprogress: {text:'Progress', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}, hidden: true},
				merchorderin_isapproved: { text: 'Approved', type: dbtype.boolean, null: false, default: '0', unset:true, suppresslist: true, options: { disabled: true } },
				merchorderin_isdeclined: { text: 'Declined', type: dbtype.boolean, null: false, default: '0', unset:true, suppresslist: true, options: { disabled: true } },
				merchorderin_approveby: { text: 'Approve By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				merchorderin_approvedate: { text: 'Approve Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
				merchorderin_declineby: { text: 'Decline By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				merchorderin_declinedate: { text: 'Decline Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },


				merchorderin_isclose: { text: 'Close', type: dbtype.boolean, null: false, default: '0', unset:true, options: { disabled: true } },
				merchorderin_closeby: { text: 'Close By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user'},
				merchorderin_closedate: { text: 'Close Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true } , hidden: true}
			},
			
			defaultsearch: ['merchorderin_id', 'merchorderin_descr']
		},


		'trn_merchorderinitem' : {
			comment: 'Item yang di request',
			primarykeys: ['merchorderinitem_id'],		
			data: {
				merchorderinitem_id: { text: 'ID', type: dbtype.varchar(14), null: false, suppresslist: true, },

				merchitem_id: { 
					text: 'Item', type: dbtype.varchar(14), uppercase: true, null: true, 
					options: { required: true, invalidMessage: 'Item harus diisi'},
					comp: comp.Combo({
						table: 'mst_merchitem',
						field_value: 'merchitem_id', field_display: 'merchitem_name',
						field_mappings: [
							`{mapping: 'merchitem_art', text: 'ART'}`,
							`{mapping: 'merchitem_mat', text: 'MAT'}`,
							`{mapping: 'merchitem_col', text: 'COL'}`,
							`{mapping: 'merchitem_size', text: 'SIZE'}`,
						],
						api: 'retail/master/merchitem/list-selector'
					})				
				},
				merchitem_art: {text:'ART', type: dbtype.varchar(30), null:true, options:{required:true,invalidMessage:'Artikel harus diisi'}},
				merchitem_mat: {text:'MAT', type: dbtype.varchar(30), null:true},
				merchitem_col: {text:'COL', type: dbtype.varchar(30), null:true},
				merchitem_size: {text:'SIZE', type: dbtype.varchar(30), null:true},
				merchitem_name: { text: 'Name', type: dbtype.varchar(255), null:true},



				merchorderinitem_qty: { 
					text: 'Qty', type: dbtype.int(4), null:false, default:0, suppresslist: true, suppresslist: true,
					handlers: {
						onChange: {
							params: 'newvalue, oldvalue',
							functionname: 'merchorderinitem_qty_changed'
						}
					}				
				},
				merchorderinitem_price: { 
					text: 'Price', type: dbtype.decimal(12,0), null:false, default:0,
					handlers: {
						onChange: {
							params: 'newvalue, oldvalue',
							functionname: 'merchorderinitem_price_changed'
						}
					}					
				},
				merchorderinitem_pricediscpercent: { 
					text: 'Disc (%)', type: dbtype.decimal(12,0), null:false, default:0,
					handlers: {
						onChange: {
							params: 'newvalue, oldvalue',
							functionname: 'merchorderinitem_pricediscpercent_changed'
						}
					}	
				},

				merchorderinitem_isdiscvalue: { 
					text: 'Disc by Value', type: dbtype.boolean, null: false, default: '0', options: { labelWidth:'300px' },
					handlers: {
						onChange: {
							params: 'newvalue, oldvalue',
							functionname: 'merchorderinitem_isdiscvalue_changed'
						}
					}				
				},

				merchorderinitem_pricediscvalue: { 
					text: 'Disc Value', type: dbtype.decimal(12,0), null:false, default:0, suppresslist: true,
					handlers: {
						onChange: {
							params: 'newvalue, oldvalue',
							functionname: 'merchorderinitem_pricediscvalue_changed'
						}
					}					
				},


				merchorderinitem_subtotal: { text: 'Subtotal', type: dbtype.decimal(14,0), null:false, default:0, suppresslist: true, suppresslist: true, options: {disabled: true}},
				merchorderinitem_estgp: { text: 'Estimated GP', type: dbtype.decimal(14,0), null:false, default:0, suppresslist: true, options: {disabled: true}},
				merchorderinitem_estgppercent: { text: 'Estimated GP (%)', type: dbtype.decimal(5, 2), null:false, default:0, suppresslist: true, options: {disabled: true}},



				merchitemctg_id: {
					section: section.Begin('Properties'),  //section.Begin('Related Dept', 'defbottomborder'),
					text:'Category', type: dbtype.varchar(30), null:true,   suppresslist: true,
					options:{ prompt: 'NONE', disabled: true },
					comp: comp.Combo({
						table: 'mst_merchitemctg', 
						field_value: 'merchitemctg_id', field_display: 'merchitemctg_name', 
						api: 'retail/master/merchitemctg/list'})
				},

				merchsea_id: {
					text:'Season', type: dbtype.varchar(10), null:true,   suppresslist: true,
					options:{ prompt: 'NONE', disabled: true },
					comp: comp.Combo({
						table: 'mst_merchsea', 
						field_value: 'merchsea_id', field_display: 'merchsea_name', 
						api: 'retail/master/merchsea/list'})
				},


				brand_id: { 
					text: 'Brand', type: dbtype.varchar(14), null: true,  suppresslist: true,
					options: { prompt: 'NONE', disabled: true }, 
					comp: comp.Combo({
						table: 'mst_brand',
						field_value: 'brand_id', field_display: 'brand_name',
						api: 'ent/affiliation/brand/list'
					})
				},	

				itemclass_id: { 
					text: 'Item Class', type: dbtype.varchar(14), null: true, suppresslist: true, 
					options: { prompt: 'NONE', disabled: true }, 
					comp: comp.Combo({
						table: 'mst_itemclass',
						field_value: 'itemclass_id', field_display: 'itemclass_name',
						api: 'local: list-get-itemclass'
					})				
				},


				accbudget_id: {
					text: 'Budget Account', type: dbtype.varchar(20), null: true, suppresslist: true,
					options: { prompt: 'NONE' , disabled: true} ,
					comp: comp.Combo({
						table: 'mst_accbudget',
						field_value: 'accbudget_id', field_display: 'accbudget_name',
						api: 'finact/master/accbudget/list'
					})
				},

				coa_id: {
					text: 'Account', type: dbtype.varchar(17), null: true, suppresslist: true,
					options: { prompt: 'NONE', disabled: true } ,
					comp: comp.Combo({
						table: 'mst_coa',
						field_value: 'coa_id', field_display: 'coa_name',
						api: 'finact/master/accbudget/list'
					})
				},

				merchitem_picture: {
					section: section.End(),
					text:'Picture', type: dbtype.varchar(90), suppresslist: true, options: {disabled: true} 
				},

				merchitem_priceori: { 
					section: section.Begin('Original Pricing'),  //section.Begin('Related Dept', 'defbottomborder'),
					text: 'Price Ori', type: dbtype.decimal(12,0), null:false, default:0, suppresslist: true, options: {disabled: true}},
				merchitem_price: { text: 'Price', type: dbtype.decimal(12,0), null:false, default:0, suppresslist: true, options: {disabled: true}},
				merchitem_pricediscpercent: { text: 'Disc (%)', type: dbtype.decimal(12,0), null:false, default:0, suppresslist: true, options: {disabled: true}},
				merchitem_pricediscvalue: { text: 'Disc Value', type: dbtype.decimal(12,0), null:false, default:0, suppresslist: true, options: {disabled: true}},
				merchitem_cogs: { 
					section: section.End(),
					text: 'cogs', type: dbtype.decimal(14,0), null:false, default:0, suppresslist: true, options: {disabled: true}},


				merchquotoutitem_qty: { 
					section: section.Begin('Quotation'), 
					text: 'Qty', type: dbtype.int(4), null:false, default:0, suppresslist: true, suppresslist: true, options: {disabled: true}
				},
				merchquotoutitem_price: { text: 'Price', type: dbtype.decimal(12,0), null:false, default:0, suppresslist: true, options: {disabled: true}},
				merchquotoutitem_pricediscpercent: { text: 'Disc (%)', type: dbtype.decimal(12,0), null:false, default:0, suppresslist: true, options: {disabled: true}},
				merchquotoutitem_isdiscvalue: { text: 'Disc by Value', type: dbtype.boolean, null: false, default: '0', options: { disabled: true, labelWidth:'300px' } },
				merchquotoutitem_pricediscvalue: { text: 'Disc Value', type: dbtype.decimal(12,0), null:false, default:0, suppresslist: true, suppresslist: true, options: {disabled: true}},
				merchquotoutitem_subtotal: { text: 'Subtotal', type: dbtype.decimal(14,0), null:false, default:0, suppresslist: true, suppresslist: true, options: {disabled: true}},
				merchquotoutitem_estgp: { text: 'Estimated GP', type: dbtype.decimal(14,0), null:false, default:0, suppresslist: true, options: {disabled: true}},
				merchquotoutitem_estgppercent: { 
					section: section.End(),
					text: 'Estimated GP (%)', type: dbtype.decimal(5, 2), null:false, default:0, suppresslist: true, options: {disabled: true}
				},

				merchitem_saldo: { 
					section: section.Begin('Inventory Info'),  //section.Begin('Related Dept', 'defbottomborder'),
					text: 'Saldo', type: dbtype.int(4), null:false, default:0, suppresslist: true, suppresslist: true, options: {disabled: true}},
				merchitem_saldodt: {text:'Tanggal Saldo', type: dbtype.date, null:false, options: {disabled: true}},
				merchitem_lastrv: {text:'Last RV', type: dbtype.varchar(30), null:true, options: {disabled: true}},
				merchitem_lastrvdt: {
					section: section.End(),
					text:'Last RV Date', type: dbtype.date, null:false, options: {disabled: true}
				},


				merchorderin_id: { text: 'ID', type: dbtype.varchar(30), null: false, hidden: true },
			}
		},


		'trn_merchorderinterm' : {
			comment: 'Term permbayaran orderin',
			primarykeys: ['merchorderinterm_id'],		
			data: {
				merchorderinterm_id: { text: 'ID', type: dbtype.varchar(14), null: false, suppresslist: true, },
				
				orderintermtype_id: {
					text: 'Type', type: dbtype.varchar(17), null: true, 
					options: {required:true, invalidMessage:'Type harus diisi' },
					comp: comp.Combo({
						table: 'mst_orderintermtype',
						field_value: 'orderintermtype_id', field_display: 'orderintermtype_name'  , field_display_name: 'orderintermtype_name',
						api: 'finact/sales/orderintermtype/list',
						OnSelectedScript: `
				form.setValue(obj.chk_merchorderinterm_isdp, record.orderintermtype_isdp)		
						`
					})
				},

				merchorderinterm_descr: { text: 'Descr', type: dbtype.varchar(255), null: true,  options: { required: true, invalidMessage: 'Descr harus diisi' } },
				merchorderinterm_days: {text:'Days', type: dbtype.int(4), default: 0, null:false},
				merchorderinterm_dtfrometa: {text:'Date Due (ETA)', type: dbtype.date, null:false, suppresslist: true},
				merchorderinterm_dt: {text:'Date Due (Actual)', type: dbtype.date, null:false, suppresslist: true},
				merchorderinterm_isdp: {text:'Down Payment', type: dbtype.boolean, null:false, default:'0', suppresslist: true},
				merchorderinterm_paymentpercent: { text: 'Payment (%)', type: dbtype.decimal(3,0), null: false, default:0, suppresslist: true },
				merchorderinterm_payment: { text: 'Payment Amount', type: dbtype.decimal(16,0), null: false, default:0},
				merchorderin_totalpayment: { text: 'Total', type: dbtype.decimal(16,0), null: false, default:0, hidden: true, suppresslist: true, options: { disabled: true }},
				merchorderin_id: { text: 'ID', type: dbtype.varchar(30), null: false, hidden: true },
			},

			uniques: {
				'orderintermtype_id': ['merchorderin_id', 'orderintermtype_id' ]
			},
		}


	},

	schema: {
		title: 'Order',
		header: 'trn_merchorderin',
		editorHandler: 'merchorderin-edit-hnd.mjs',
		listHandler: 'merchorderin-list-hnd.mjs',
		detils: {
			'items' : {
				title: 'Items', table: 'trn_merchorderinitem', form: true, headerview: 'merchorderin_descr', 
				editorHandler: 'merchorderin-itemsform-hnd.mjs',
				listHandler: 'merchorderin-itemsgrid-hnd.mjs',
			}
			// 'term' : {
			// 	title: 'Payment Term', table: 'trn_merchorderinterm', form: true, headerview: 'merchorderin_descr' ,
			// 	editorHandler: 'merchorderin-termform-hnd.mjs',
			// 	listHandler: 'merchorderin-termsgrid-hnd.mjs',
			
			// },
		}
	}


}