'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Site",
	autoid: false,

	persistent: {
		'web_user' : {
			primarykeys: ['user_id'],
			comment: 'Daftar Site',
			data: {
				user_id: {text:'ID', type: dbtype.varchar(14), null:false},
				user_fullname: {text:'Full Name', type: dbtype.varchar(90), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama harus diisi'}},
				user_email: {text:'Email', type: dbtype.varchar(120), null:true, suppresslist: true, lowercase: true, options:{required:true,validType:'email',invalidMessage:'Email harus diisi dan dengan format yang benar'}},
				user_birthdate: {text:'Exit Date', type: dbtype.date, null:true, suppresslist: true},
				gender_id: { 
					text: 'Gender', type: dbtype.varchar(1), uppercase: true, null: false,  
					options: { required: true, invalidMessage: 'Gender harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_gender',
						field_value: 'gender_id', field_display: 'gender_name',
						api: 'retail/webcommerce/webuser/list-gender'
					})
				}
			},
			defaultsearch : ['site_id', 'site_name'],
			uniques: {
				'site_name' : ['cluster_id', 'site_name']
			}
		},

		'web_userpref' : {
			primarykeys: ['userpref_id'],
			comment: 'Preferensi User',
			data: {
				userpref_id: {text:'ID', type: dbtype.varchar(14), null:false},
				userpref_key: {text:'Key', type: dbtype.varchar(10), null:false, uppercase: true, options:{required:true,invalidMessage:'Key harus diisi'}},
				userpref_value: {text:'Value', type: dbtype.varchar(30), null:false, uppercase: true, options:{required:true,invalidMessage:'Value harus diisi'}},
				preftype_id: { 
					text: 'Type', type: dbtype.varchar(5), null:false, uppercase: true, null: false,  suppresslist: true,
					options: { required: true, invalidMessage: 'Type preference harus diisi' }, 
					comp: comp.Combo({
						table: 'web_preftype',
						field_value: 'gender_id', field_display: 'gender_name',
						api: 'retail/webcommerce/webpref/list'
					})
				},	
				user_id: {text:'User', type: dbtype.varchar(14), null:false},
			},
			defaultsearch : ['userpref_key'],
			uniques: {
				'userpref_pair' : ['user_id', 'preftype_id', 'userpref_key']
			}					
		},

		'web_userphone' : {
			primarykeys: ['userphone_id'],
			comment: 'Telphone User',
			data: {
				userphone_id: {text:'ID', type: dbtype.varchar(14), null:false},
				userphone_number : {text:'ID', type: dbtype.varchar(14), null:false},
				user_id: {text:'User', type: dbtype.varchar(14), null:false},
			},
			defaultsearch : ['userphone_number'],
			uniques: {
				'userphone_number' : ['userphone_number']
			}					
		},

		'web_uservisit' : {
			primarykeys: ['uservisit_id'],
			comment: 'Visit Log User',
			data: {
				uservisit_id: {text:'ID', type: dbtype.varchar(14), null:false},


				user_id: {text:'User', type: dbtype.varchar(14), null:false},
			},
			defaultsearch : [],
			uniques: {}	
		},

		'web_useraction' : {
			primarykeys: ['useraction_id'],
			comment: 'Action Log User',
			data: {
				useraction_id: {text:'ID', type: dbtype.varchar(14), null:false},

				user_id: {text:'User', type: dbtype.varchar(14), null:false},
			},
			defaultsearch : [],
			uniques: {}	
		}
	},
	
	schema: {
		title: 'Site',
		header: 'web_site',
		detils: {
			'pref' : {title: 'Preference', table:'web_userpref', form: true, headerview:'user_fullname'},
			'visit' : {title: 'Visit', table:'web_uservisit', form: true, headerview:'user_fullname'},
			'action' : {title: 'Action', table:'web_useraction', form: true, headerview:'user_fullname'},
		}
	}


}

/*
tampilan city pakai flex:
https://codepen.io/townivan/post/flexbox-flex-direction-column

*/
