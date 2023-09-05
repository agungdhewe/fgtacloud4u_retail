'use strict';



const btn_phoneadd = document.getElementById('btn_phoneadd');
const btn_preference = document.getElementById('btn_preference');



export async function init(opt) {
	let self = {}

	btn_phoneadd.addEventListener('click', (ev)=>{ btn_phoneadd_click(self, ev) })
	btn_preference.addEventListener('click', (ev)=>{ btn_preference_click(self, ev) });
}



function btn_phoneadd_click(self, ev) {
	console.log('add');
}

function btn_preference_click(self, ev) {
	console.log('ok');
}