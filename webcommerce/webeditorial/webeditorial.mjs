import {fgta4grid} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4grid.mjs'
import {fgta4form} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4form.mjs'
import * as fgta4pages from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pages.mjs'
import * as fgta4pageslider from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pageslider.mjs'
import * as apis from './webeditorial.apis.mjs'
import * as pList from './webeditorial-list.mjs'
import * as pEdit from './webeditorial-edit.mjs'
import * as pEditPicturegrid from './webeditorial-picturegrid.mjs'
import * as pEditPictureform from './webeditorial-pictureform.mjs'
import * as pEditMerchgrid from './webeditorial-merchgrid.mjs'
import * as pEditMerchform from './webeditorial-merchform.mjs'



const pnl_list = $('#pnl_list')
const pnl_edit = $('#pnl_edit')
const pnl_editpicturegrid = $('#pnl_editpicturegrid')
const pnl_editpictureform = $('#pnl_editpictureform')
const pnl_editmerchgrid = $('#pnl_editmerchgrid')
const pnl_editmerchform = $('#pnl_editmerchform')



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

	pages
		.setSlider(slider)
		.initPages([
			{panel: pnl_list, handler: pList},
			{panel: pnl_edit, handler: pEdit},
			{panel: pnl_editpicturegrid, handler: pEditPicturegrid},
			{panel: pnl_editpictureform, handler: pEditPictureform},
			{panel: pnl_editmerchgrid, handler: pEditMerchgrid},
			{panel: pnl_editmerchform, handler: pEditMerchform}			
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