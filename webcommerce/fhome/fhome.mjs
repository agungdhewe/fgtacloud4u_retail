import * as fgta_carousel from './carousel.mjs';
import * as component from '../../../../../index.php/jslibs/fgta/fgta__loader.mjs'


const carousel = fgta_carousel.construct('fgta-carousel');


export async function init(param) {
	carousel.init(()=>{
		var eltitle = document.querySelectorAll('.fgta-carousel-title, .fgta-carousel-descr, .fgta-carousel-morelink');
		for (var i=0; i<eltitle.length; i++) {
			eltitle[i].style.display = 'block';
		}
	});

	// Cek Login
	var url = new URL(window.location.href)
	var urlaccessToken = url.searchParams.get('accessToken')
	if (accessToken!=null) {
		Cookies.set('accessToken', urlaccessToken, {SameSite: "Strict"});
	}

	var accessToken = Cookies.get('accessToken');
	if (accessToken!=null) {
		component.Messager.Wait();
		var apiname = 'retail/webcommerce/flogin/authlogin';
		var apidata = {
			accessToken: accessToken,
			equipmentId: Cookies.get('equipmentId')
		}
		var result = await component.api.call(apiname, apidata);
		component.Messager.Wait(false);
	
		console.log(result);
	}

}



