'use strict';

import * as component from '../../../../../index.php/jslibs/fgta/fgta__loader.mjs'


export async function dologin() {
	console.log('test');

	var apiname = 'retail/webcommerce/flogin/getloginurl';
	var apidata = {
		param: '12345'
	}
	var result = await component.api.call(apiname, apidata);
	Cookies.set('equipmentId', result.equipmentId, {SameSite: "Strict"});

	// component.Messager.Wait(false);
	var loginurl = result.url;
	console.log(loginurl);	

	location.href = loginurl;
	
}