'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Shipment Budget",
	autoid: false,

	persistent: {
		'mst_merchshipbudgetacc' : {
			primarykeys: ['merchshipbudgetacc_id'],
			comment: 'Daftar Shipment Budget',
			data: {
				merchshipbudgetacc_id: {text:'ID', type: dbtype.varchar(10), null:false, uppercase: true},
				merchshipbudgetacc_name: {text: 'Name', type: dbtype.varchar(90), null:false, uppercase: true,  options:{required:true,invalidMessage:'Nama harus diisi'}},
				merchshipbudgetacc_group: {text: 'Group', type: dbtype.varchar(90), null:false, uppercase: true,  options:{required:true,invalidMessage:'Nama Report harus diisi'}},

				coa_id: {
					text:'Account', type: dbtype.varchar(20), null:true,
					options:{required:true, invalidMessage:'Account Biaya harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', 
						api: 'finact/master/coa/list'})
				},

			},
			
			uniques : {
				'merchshipbudgetacc_name': ['merchshipbudgetacc_name']
			},
		}
	},
	
	schema: {
		title: 'Shipment Budget',
		header: 'mst_merchshipbudgetacc',
		detils: {}
	}


}		