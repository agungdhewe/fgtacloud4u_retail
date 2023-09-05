'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Feedback",
	autoid: true,

	persistent: {
		'web_feedback' : {
			primarykeys: ['feedback_id'],
			comment: 'Daftar Feedback',
			data: {
				feedback_id: {text:'ID', type: dbtype.varchar(14), null:false},
				feedback_name: {text:'Name', type: dbtype.varchar(90), null:true, options: {disabled: false}},
				feedback_email: {text:'Email', type: dbtype.varchar(90), null:true, options: {disabled: true}},
				feedback_phone: {text:'Phone', type: dbtype.varchar(90), null:true, suppresslist: true, options: {disabled: true}},
				feedback_message: {text:'Message', type: dbtype.varchar(1000), null:true, suppresslist: true, options: {disabled: true}},

				feedback_browsername: {text:'Browser Name', type: dbtype.varchar(90), null:true, suppresslist: true, options: {disabled: true}},
				feedback_browserversion: {text:'Browser Version', type: dbtype.varchar(90), null:true, suppresslist: true, options: {disabled: true}},
				feedback_browseros: {text:'Browser OS', type: dbtype.varchar(90), null:true, suppresslist: true, options: {disabled: true}},

				feedback_continent: {text:'Continent', type: dbtype.varchar(120), null:true, suppresslist: true, options: {disabled: true}},
				feedback_continentcode: {text:'Continent Code', type: dbtype.varchar(120), null:true, suppresslist: true, options: {disabled: true}},
				feedback_country: {text:'Country', type: dbtype.varchar(120), null:true, suppresslist: true, options: {disabled: true}},
				feedback_countrycode: {text:'Country Code', type: dbtype.varchar(120), null:true, suppresslist: true, options: {disabled: true}},
				feedback_state: {text:'State', type: dbtype.varchar(120), null:true, suppresslist: true, options: {disabled: true}},
				feedback_statecode: {text:'State Code', type: dbtype.varchar(120), null:true, suppresslist: true, options: {disabled: true}},
				feedback_city: {text:'City', type: dbtype.varchar(120), null:true, suppresslist: true, options: {disabled: true}},
				feedback_postalcode: {text:'Postal Code', type: dbtype.varchar(120), null:true, suppresslist: true, options: {disabled: true}},
				feedback_metrocode: {text:'Metro Code', type: dbtype.varchar(120), null:true, suppresslist: true, options: {disabled: true}},
				feedback_latitude: {text:'Latitude', type: dbtype.varchar(120), null:true, suppresslist: true, options: {disabled: true}},
				feedback_longitude: {text:'Longitude', type: dbtype.varchar(120), null:true, suppresslist: true, options: {disabled: true}},
				feedback_timezone: {text:'Time Zone', type: dbtype.varchar(120), null:true, suppresslist: true, options: {disabled: true}},
				feedback_datetime: {text:'Date Time', type: dbtype.varchar(120), null:true, options: {disabled: true}},

				cluster_id: { 
					text: 'Cluster', type: dbtype.varchar(10), uppercase: true, null: false,   suppresslist: true, 
					options: { required: true, invalidMessage: 'Cluster harus diisi', disabled: true, }, 
					comp: comp.Combo({
						table: 'web_cluster',
						field_value: 'cluster_id', field_display: 'cluster_name',
						api: 'retail/webcommerce/webcluster/list'
					})
				}				
			},
			defaultsearch : ['feedback_name', 'feedback_email'],
		}
	},

	schema: {
		title: 'Feedback',
		header: 'web_feedback',
		detils: {
		}
	}
}




// https://tournasdimitrios1.wordpress.com/2012/01/15/build-a-visitor-tracking-system-for-your-website-with-php/
// https://github.com/Ghostff/php-visitors-tracking