var this_page_id;


let tbl_list = $('#pnl_brand-tbl_list')

let grd_list = {}


let last_scrolltop = 0

let currentdata = {}




export async function init(opt) {
	this_page_id = opt.id

	grd_list = new global.fgta4grid(tbl_list, {
		OnRowFormatting: (tr) => { grd_list_rowformatting(tr) },
		OnRowClick: (tr, ev) => { grd_list_rowclick(tr, ev) },
		OnCellClick: (td, ev) => { grd_list_cellclick(td, ev) },
		OnCellRender: (td) => { grd_list_cellrender(td) },
		OnRowRender: (tr) => { grd_list_rowrender(tr) }
	})


	document.addEventListener('OnSizeRecalculated', (ev) => {
		OnSizeRecalculated(ev.detail.width, ev.detail.height)
	})	

	document.addEventListener('OnButtonBack', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
			$ui.getPages().show('pnl_location', ()=>{
			})
		}
	})


}

export function OnSizeRecalculated(width, height) {
}


export function open(data, rowid, viewmode=true, fn_callback) {
	//data.location	
	currentdata.location = data.location;
	
	$('.pendingfollowup_location').html(data.location);






	
	if (typeof fn_callback === 'function') {
		fn_callback()
	}
}