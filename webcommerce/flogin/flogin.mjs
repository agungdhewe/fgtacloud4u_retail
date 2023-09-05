'use strict';

import * as component from '../../../../../index.php/jslibs/fgta/fgta__loader.mjs'


export async function init(opt) {


	console.log('test');
	// const url = new URL(window.location.href)
	// const accessToken = url.searchParams.get('accessToken')
	
	// if (accessToken==null) {
		// component.Messager.Wait();
		var apiname = 'retail/webcommerce/flogin/getloginurl';
		var apidata = {
			param: '12345'
		}
		var result = await component.api.call(apiname, apidata);
		Cookies.set('equipmentId', result.equipmentId, {SameSite: "Strict"});

		// component.Messager.Wait(false);
		var loginurl = result.url;
		// console.log(loginurl);

		var iframe = document.getElementById('pnl_login');
		iframe.src = loginurl;


		// var loginurl = result.url;
		// location.href = loginurl;


	// } 


}


