'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Merchandise Quotation Out",
	autoid: true,
	icon : "icon-order-white.svg",
	backcolor : "#348183",
	idprefix: 'SO', 
	printing: true,	
	committer: true,
	approval: true,
	doc_id: 'QUOTOUT',	

	persistent: {
		'trn_merchquotout': {
			comment: 'Daftar Quotation item merchandise',
			primarykeys: ['merchquotout_id'],
			data: {
				merchquotout_id: { text: 'ID', type: dbtype.varchar(30), null: false },
				unit_id: {
					text: 'Unit', type: dbtype.varchar(10), null: true, suppresslist: true, 
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_unit',
						field_value: 'unit_id', field_display: 'unit_name',
						api: 'ent/organisation/unit/list'
					})
				},

				merchquotout_descr: { text: 'Descr', type: dbtype.varchar(90), null: true,  options: { required: true, invalidMessage: 'Descr harus diisi' } },
				merchquotout_dt: {text:'Date', type: dbtype.date, null:false},
				merchquotout_dtvalid: {text:'Valid Until', type: dbtype.date, null:false},

				orderintype_id: {
					text:'Order Type', type: dbtype.varchar(10), null:true, suppresslist: true,
					// options: { required: true, invalidMessage: 'Order Type Harus diisi', disabled:false } ,
					options:{prompt:'NONE'},
					comp: comp.Combo({
						table: 'mst_orderintype', 
						field_value: 'orderintype_id', field_display: 'orderintype_name',  field_display_name: 'orderintype_name',
						api: 'finact/sales/orderintype/list',
						OnSelectedScript: `
							console.log(record);
						`
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

				ae_empl_id: {
					text:'AE', type: dbtype.varchar(14), null:true, suppresslist: true,
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
				
				sales_dept_id: {
					text: 'Item Owner Dept', type: dbtype.varchar(30), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Departemen harus diisi'},
					comp: comp.Combo({
						table: 'mst_dept',
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'sales_dept_name',
						api: 'ent/organisation/dept/list'
					})
				},


				dept_id: {
					text: 'Dept', type: dbtype.varchar(30), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Departemen harus diisi'},
					comp: comp.Combo({
						table: 'mst_dept',
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'sales_dept_name',
						api: 'ent/organisation/dept/list'
					})
				},	


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

			
				
				merchquotout_totalitem: { 
					section: section.Begin('Amount'),  //section.Begin('Related Dept', 'defbottomborder'),
					text: 'Total Item', type: dbtype.int(5), null: false, default:0, suppresslist: true, options: { disabled: true} },
				merchquotout_totalqty: { text: 'Total Qty', type: dbtype.int(5), null: false, default:0, suppresslist: true, options: { disabled: true} },
				merchquotout_salesgross: { text: 'Gross Sales', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				merchquotout_discount: { text: 'Dicount', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				merchquotout_subtotal: { text: 'Sub Total', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				merchquotout_nett: { text: 'Sales Nett', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				merchquotout_ppn: { text: 'PPN', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				merchquotout_total: { text: 'Total', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				merchquotout_totaladdcost: { text: 'Additional Cost', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				merchquotout_payment: { 
					section: section.End(),
					text: 'Total Payment', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },


				merchquotoutitem_estgp: { 
					section: section.Begin('Estimated Gross Profit', 'defbottomborder'), 
					text: 'GP', type: dbtype.decimal(14,0), null:false, default:0, suppresslist: true, options: {disabled: true}},
				merchquotoutitem_estgppercent: { 
					section: section.End(),
					text: 'GP (%)', type: dbtype.decimal(5, 2), null:false, default:0, suppresslist: true, options: {disabled: true}},
	

				// merchquotout_rejectnotes: { text: 'Reject Notes', type: dbtype.varchar(255), null: true,  unset:true, suppresslist: true, options:{disabled: true} },

				doc_id: {
					text:'Doc', type: dbtype.varchar(30), null:false, suppresslist: true,
					options: {required:true, invalidMessage:'ID harus diisi' },
					comp: comp.Combo({
						table: 'mst_doc',
						field_value: 'doc_id', field_display: 'doc_name', field_display_name: 'doc_name',
						api: 'ent/organisation/docs/list'
					})				
				},

				merchquotout_version: {text:'Doc Version', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options:{disabled:true}},
				merchquotout_iscommit: {text:'Commit', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}},
				merchquotout_isapprovalprogress: {text:'Progress', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}, hidden: true},
				merchquotout_isapproved: { text: 'Approved', type: dbtype.boolean, null: false, default: '0', unset:true, suppresslist: true, options: { disabled: true } },
				merchquotout_isdeclined: { text: 'Declined', type: dbtype.boolean, null: false, default: '0', unset:true, suppresslist: true, options: { disabled: true } },

				merchquotout_commitby: {text:'CommitBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				merchquotout_commitdate: {text:'CommitDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true},	
				merchquotout_approveby: { text: 'Approve By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				merchquotout_approvedate: { text: 'Approve Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
				merchquotout_declineby: { text: 'Decline By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				merchquotout_declinedate: { text: 'Decline Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
				merchquotout_isclose: { text: 'Close', type: dbtype.boolean, null: false, default: '0', unset:true, options: { disabled: true } },
				merchquotout_closeby: { text: 'Close By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user'},
				merchquotout_closedate: { text: 'Close Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true } , hidden: true}


			},
			defaultsearch: ['merchquotout_id', 'merchquotout_descr']
		},

		'trn_merchquotoutitem': {
			comment: 'Daftar item quotation',
			primarykeys: ['merchquotoutitem_id'],
			data: {
				merchquotoutitem_id: { text: 'ID', type: dbtype.varchar(14), null: false },

				merchitem_id: { 
					text: 'Item', type: dbtype.varchar(14), null: true, suppresslist: true, 
					options: { prompt: 'NONE' }, 
					comp: comp.Combo({
						table: 'mst_merchitem',
						field_value: 'merchitem_id', field_display: 'merchitem_name',
						api: 'retail/master/merchitem/list-selector',
						staticfilter: `
				criteria.unit_id = header_data.unit_id;						
						`,


					})				
				},
				merchitem_art: {text:'ART', type: dbtype.varchar(30), null:true, options: {disabled: true}},
				merchitem_mat: {text:'MAT', type: dbtype.varchar(30), null:true, options: {disabled: true}},
				merchitem_col: {text:'COL', type: dbtype.varchar(30), null:true, options: {disabled: true}},
				merchitem_size: {text:'SIZE', type: dbtype.varchar(30), null:true, options: {disabled: true}},
				merchitem_name: { text: 'Name', type: dbtype.varchar(255), null: true , options: {disabled: true}},

				merchquotoutitem_qty: { 
					text: 'Qty', type: dbtype.int(4), null:false, default:0, suppresslist: true, suppresslist: true,
					handlers: {
						onChange: {
							params: 'newvalue, oldvalue',
							functionname: 'merchquotoutitem_qty_changed'
						}
					} 
				},
				merchquotoutitem_price: { text: 'Price', type: dbtype.decimal(12,0), null:false, default:0,
					handlers: {
						onChange: {
							params: 'newvalue, oldvalue',
							functionname: 'merchquotoutitem_price_changed'
						}
					} 
				},
				merchquotoutitem_pricediscpercent: { 
					text: 'Disc (%)', type: dbtype.decimal(12,0), null:false, default:0,
					handlers: {
						onChange: {
							params: 'newvalue, oldvalue',
							functionname: 'merchquotoutitem_pricediscpercent_changed'
						}
					}
				
				},
				merchquotoutitem_isdiscvalue: { 
					text: 'Disc by Value', type: dbtype.boolean, null: false, default: '0', options: { labelWidth:'300px' },
					handlers: {
						onChange: {
							params: 'newvalue, oldvalue',
							functionname: 'merchquotoutitem_isdiscvalue_changed'
						}
					}				
				},
				merchquotoutitem_pricediscvalue: { 
					text: 'Disc Value', type: dbtype.decimal(12,0), null:false, default:0, suppresslist: true,
					handlers: {
						onChange: {
							params: 'newvalue, oldvalue',
							functionname: 'merchquotoutitem_pricediscvalue_changed'
						}
					}					
				},
				merchquotoutitem_subtotal: { text: 'Subtotal', type: dbtype.decimal(14,0), null:false, default:0, suppresslist: true, suppresslist: true, options: {disabled: true}},
				merchquotoutitem_estgp: { text: 'Estimated GP', type: dbtype.decimal(14,0), null:false, default:0, suppresslist: true, options: {disabled: true}},
				merchquotoutitem_estgppercent: { text: 'Estimated GP (%)', type: dbtype.decimal(5, 2), null:false, default:0, suppresslist: true, options: {disabled: true}},



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


			
				merchitem_saldo: { 
					section: section.Begin('Inventory Info'),  //section.Begin('Related Dept', 'defbottomborder'),
					text: 'Saldo', type: dbtype.int(4), null:false, default:0, suppresslist: true, suppresslist: true, options: {disabled: true}},
				merchitem_saldodt: {text:'Tanggal Saldo', type: dbtype.date, null:false, options: {disabled: true}},
				merchitem_lastrv: {text:'Last RV', type: dbtype.varchar(30), null:true, options: {disabled: true}},
				merchitem_lastrvdt: {
					section: section.End(),
					text:'Last RV Date', type: dbtype.date, null:false, options: {disabled: true}
				},


				merchquotout_id: { text: 'ID', type: dbtype.varchar(30), null: false, hidden: true },
			},
			defaultsearch: ['merchquotoutitem_id', 'merchquotoutitem_descr']
		},


		'trn_merchquotoutterm' : {
			comment: 'Term permbayaran orderin',
			primarykeys: ['merchquotoutterm_id'],		
			data: {
				merchquotoutterm_id: { text: 'ID', type: dbtype.varchar(14), null: false, suppresslist: true, },
				merchquotoutterm_descr: { text: 'Descr', type: dbtype.varchar(255), null: true,  options: { required: true, invalidMessage: 'Descr harus diisi' } },
				merchquotoutterm_days: {text:'Days from ETA', type: dbtype.int(4), default: 0, null:false},
				merchquotoutterm_isdp: {text:'Down Payment', type: dbtype.boolean, null:false, default:'0', suppresslist: true},
				merchquotoutterm_paymentpercent: { text: 'Payment (%)', type: dbtype.decimal(3,0), null: false, default:0},
				merchquotout_id: { text: 'ID', type: dbtype.varchar(30), null: false, hidden: true },
			}
		}		

	},


	schema: {
		title: 'Quotation',
		header: 'trn_merchquotout',
		editorHandler: 'merchquotout-edit-hnd.mjs',
		listHandler: 'merchquotout-list-hnd.mjs',
		detils: {
			'items' : {
				title: 'Items', table: 'trn_merchquotoutitem', form: true, headerview: 'merchquotout_descr' ,
				editorHandler: 'merchquotout-itemsform-hnd.mjs',
				listHandler: 'merchquotout-itemsgrid-hnd.mjs',

			},
			// 'terms' : {title: 'Payment Term', table: 'trn_merchquotoutterm', form: true, headerview: 'merchquotout_descr' },
		}
	}


}	

