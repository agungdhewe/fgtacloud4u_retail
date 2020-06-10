import {fgta4grid} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4grid.mjs'
import * as fgta4pages from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pages.mjs'
import * as fgta4pageslider from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pageslider.mjs'
import * as pLocation from './pendingfollowup-location.mjs'
import * as pBrand from './pendingfollowup-brand.mjs'
import * as pNumber from './pendingfollowup-number.mjs'
import * as pCs from './pendingfollowup-cs.mjs'

const pnl_location = $('#pnl_location')
const pnl_brand = $('#pnl_brand')
const pnl_number = $('#pnl_number')
const pnl_cs = $('#pnl_cs')


var pages = fgta4pages;
var slider = fgta4pageslider;

export async function init() {

	global.fgta4grid = fgta4grid

	document.getElementsByTagName("body")[0].style.margin = '5px 5px 5px 5px'

	pages
		.setSlider(slider)
		.initPages([
			{panel: pnl_location, handler: pLocation},
			{panel: pnl_brand, handler: pBrand},
			{panel: pnl_number, handler: pNumber},
			{panel: pnl_cs, handler: pCs}
		])

	$ui.setPages(pages)

}