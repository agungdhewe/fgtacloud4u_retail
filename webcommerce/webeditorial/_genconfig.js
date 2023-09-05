'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Editorial",
	autoid: true,
	committer: true,

	persistent: {
		'web_editorial' : {
			primarykeys: ['editorial_id'],
			comment: 'Daftar Editorial',
			data: {
				editorial_id: {text:'ID', type: dbtype.varchar(14), null:false, uppercase: true},
				editorial_title: {text:'Title', type: dbtype.varchar(90), null:false, uppercase: true, options:{required:true,invalidMessage:'Title Editorial harus diisi'}},
				editorial_preface: {text:'Preface', type: dbtype.varchar(500), null:true, suppresslist: true},
				editorial_datestart: { text: 'Active Date', type: dbtype.date, null: false, suppresslist: false },
				editorial_dateend: { text: 'Last Active Date', type: dbtype.date, null: false, suppresslist: true },
				editorial_isdatelimit: { text: 'Limit Active Date', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: { disabled: true } },
				editorial_content: {text:'Content', type: dbtype.varchar(25000), null:true, suppresslist: true},
				editorial_tags: {text:'Tags', type: dbtype.varchar(255), null:true, suppresslist: true},
				editorial_keyword: {text:'Keyword', type: dbtype.varchar(255), null:true, suppresslist: true},
				editorial_picture: {text:'Picture', type: dbtype.varchar(90), suppresslist: true,  comp: comp.Filebox(), options: { accept: 'image/*' }},

				editorial_iscommit: {text:'Commit', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}},
				editorial_commitby: {text:'CommitBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				editorial_commitdate: {text:'CommitDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true},	
				editorial_version: {text:'Version', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options:{disabled:true}},

				editorialtype_id: { 
					text: 'Type', type: dbtype.varchar(7), uppercase: true, null: false,   suppresslist: true,
					options: { required: true, invalidMessage: 'Tipe Editorial harus diisi' }, 
					comp: comp.Combo({
						table: 'web_editorialtype',
						field_value: 'editorialtype_id', field_display: 'editorialtype_name',
						api: 'retail/webcommerce/webeditorialtype/list'
					})
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
		},



		'web_editorialpic' : {
			primarykeys: ['editorialpic_id'],
			comment: 'Daftar Picture dari Editorial',
			data: {
				editorialpic_id: {text:'ID', type: dbtype.varchar(14), null:false},	
				editorialpic_name: {text:'Name', type: dbtype.varchar(90), null:false, options: {required:true,invalidMessage:'Nama harus diisi'}},	
				editorialpic_descr: {text:'Descr', type: dbtype.varchar(255), null:true},	
				editorialpic_order: {text:'Order', type: dbtype.int(4), null:false, default:'0', suppresslist: true},
				editorialpic_file: {text:'Picture', type: dbtype.varchar(90), suppresslist: true,  comp: comp.Filebox(), options: { accept: 'image/*' }},
				editorial_id: {text:'Site', type: dbtype.varchar(14), null:false},	
			},
			defaultsearch: ['sitepic_id', 'sitepic_descr'],
			uniques: {
				'editorialpic_name' : ['editorial_id', 'editorialpic_name']
			}
		},

		'web_editorialmerch' : {
			primarykeys: ['editorialmerch_id'],
			comment: 'Daftar Merchandise yang related ke artikel ini',
			data: {
				editorialmerch_id: {text:'ID', type: dbtype.varchar(14), null:false},
				
				merch_id: { 
					text: 'Merchandise', type: dbtype.varchar(14), uppercase: true, null: false,   suppresslist: true,
					options: { required: true, invalidMessage: 'Merchandise harus diisi' }, 
					comp: comp.Combo({
						table: 'web_merch',
						field_value: 'merch_id', field_display: 'merch_name',
						api: 'retail/webcommerce/webmerch/list'
					})
				},

				brand_id: { 
					text: 'Brand', type: dbtype.varchar(10), uppercase: true, null: false,   suppresslist: true,
					options: { required: true, invalidMessage: 'Cluster harus diisi' }, 
					comp: comp.Combo({
						table: 'web_brand',
						field_value: 'brand_id', field_display: 'brand_name',
						api: 'retail/webcommerce/webbrand/list'
					})
				},
				editorial_id: {text:'Site', type: dbtype.varchar(14), null:false},	
			},
			uniques: {
				'merch_id_pair' : ['editorial_id', 'merch_id']
			}
		}

	},

	schema: {
		title: 'Editorial',
		header: 'web_editorial',
		detils: {
			'picture': {title: 'Pictures', table: 'web_editorialpic', form: true, headerview: 'editorial_title' },
			'merch' : {title: 'Related Merchandise', table: 'web_editorialmerch', form: true, headerview: 'editorial_title' },
		}

	}
}
