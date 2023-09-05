var this_page_id;



const tbl_list = $('#pnl_location-tbl_list')
const btn_refresh = $('#pnl_location-btn_refresh')

let grd_list = {}

let last_scrolltop = 0


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
	

	btn_refresh.linkbutton({
		onClick: () => { btn_refresh_click() }
	})	


	btn_refresh_click();
}


export function OnSizeRecalculated(width, height) {
}




function btn_refresh_click(self) {
	
	grd_list.clear()
	var fn_listloading = async (options) => {
		options.api = `${global.modulefullname}/listlocation`
	
		// if (search!='') {
		// 	options.criteria['search'] = search
		// }
	}

	var fn_listloaded = async (result, options) => {
		// console.log(result)
	}

	grd_list.listload(fn_listloading, fn_listloaded)
}


function grd_list_rowformatting(tr) {

}


function grd_list_rowclick(tr, ev) {
	// console.log(tr)
	var trid = tr.getAttribute('id')
	var dataid = tr.getAttribute('dataid')
	var record = grd_list.DATA[dataid]
	var viewmode = true
	last_scrolltop = $(window).scrollTop()

	var nextpage = 'pnl_brand'
	$ui.getPages().ITEMS[nextpage].handler.open(record, trid, viewmode, (err)=> {
		if (err) {
			console.log(err)
		} else {
			$ui.getPages().show(nextpage)
		}
	})
}

function grd_list_cellclick(td, ev) {
	// console.log(td)
	// ev.stopPropagation()
}

function grd_list_cellrender(td) {
	var text = td.innerHTML
	if (td.mapping == 'QTY') {
		$(td).css('text-align', 'right')
		// td.innerHTML = `<a href="javascript:void(0)">${text}</a>`
	}
}

function grd_list_rowrender(tr) {
	var dataid = tr.getAttribute('dataid')
	var record = grd_list.DATA[dataid]

	$(tr).find('td').each((i, td) => {
		var mapping = td.getAttribute('mapping')
		if (mapping=='pending_count') {
			// if (!record.disabled) {
			// 	td.classList.add('fgtable-rowred')
			// }
			td.style.textAlign = 'right'
		} else if (mapping=='pending_oldest') {
			td.style.textAlign = 'right'

			var value = td.innerHTML;
			var newValue = `${value}&nbsp;&nbsp;&nbsp;<i><small>minutes</small></i>`;
			td.innerHTML = newValue;
		}

	})
}

