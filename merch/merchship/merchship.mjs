import {fgta4grid} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4grid.mjs'
import {fgta4form} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4form.mjs'
import * as fgta4pages from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pages.mjs'
import * as fgta4pageslider from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pageslider.mjs'
import * as settings from './merchship.settings.mjs'
import * as apis from './merchship.apis.mjs'
import * as pList from './merchship-list.mjs'
import * as pEdit from './merchship-edit.mjs'
import * as pEditBudgetgrid from './merchship-budgetgrid.mjs'
import * as pEditBudgetform from './merchship-budgetform.mjs'
import * as pEditRecvgrid from './merchship-recvgrid.mjs'
import * as pEditRecvform from './merchship-recvform.mjs'
import * as pEditBillingrid from './merchship-billingrid.mjs'
import * as pEditBillinform from './merchship-billinform.mjs'
import * as pEditPreview from './merchship-preview.mjs'
import * as pEditFilter from './merchship-filter.mjs'
import * as pEditSummary from './merchship-summary.mjs'



const pnl_list = $('#pnl_list')
const pnl_edit = $('#pnl_edit')
const pnl_editbudgetgrid = $('#pnl_editbudgetgrid')
const pnl_editbudgetform = $('#pnl_editbudgetform')
const pnl_editrecvgrid = $('#pnl_editrecvgrid')
const pnl_editrecvform = $('#pnl_editrecvform')
const pnl_editbillingrid = $('#pnl_editbillingrid')
const pnl_editbillinform = $('#pnl_editbillinform')
const pnl_editpreview = $('#pnl_editpreview')
const pnl_editfilter = $('#pnl_editfilter')
const pnl_editsummary = $('#pnl_editsummary')



var pages = fgta4pages;
var slider = fgta4pageslider;


export const SIZE = {width:0, height:0}


export async function init(opt) {
	// $ui.grd_list = new fgta4grid()
	// $ui.grd_edit = new fgta4grid()

	global.fgta4grid = fgta4grid
	global.fgta4form = fgta4form



	$ui.apis = apis
	document.getElementsByTagName("body")[0].style.margin = '5px 5px 5px 5px'

	opt.variancedata = global.setup.variancedata;
	settings.setup(opt);

	pages
		.setSlider(slider)
		.initPages([
			{panel: pnl_list, handler: pList},
			{panel: pnl_edit, handler: pEdit},
			{panel: pnl_editbudgetgrid, handler: pEditBudgetgrid},
			{panel: pnl_editbudgetform, handler: pEditBudgetform},
			{panel: pnl_editrecvgrid, handler: pEditRecvgrid},
			{panel: pnl_editrecvform, handler: pEditRecvform},
			{panel: pnl_editbillingrid, handler: pEditBillingrid},
			{panel: pnl_editbillinform, handler: pEditBillinform},
			{panel: pnl_editpreview, handler: pEditPreview},
			{panel: pnl_editfilter, handler: pEditFilter},
			{panel: pnl_editsummary, handler: pEditSummary}			
		], opt)

	$ui.setPages(pages)


	document.addEventListener('OnButtonHome', (ev) => {
		if (ev.detail.cancel) {
			return
		}

		ev.detail.cancel = true;
		ExitModule();
	})
	
	document.addEventListener('OnSizeRecalculated', (ev) => {
		OnSizeRecalculated(ev.detail.width, ev.detail.height)
	})	



	await PreloadData()

}


export function OnSizeRecalculated(width, height) {
	SIZE.width = width
	SIZE.height = height
}

export async function ExitModule() {
	$ui.home();
}



async function PreloadData() {
	
}