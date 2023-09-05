const crl_view_classname = 'fgta-carousel-view';
const crl_nextprev_classname = 'fgta-carousel-nextprev';
const crl_btn_next_classname = 'fgta-carousel-btn_next';
const crl_btn_prev_classname = 'fgta-carousel-btn_prev';
const crl_pages_classname = 'fgta-carousel-pages';
const crl_pages_dot = 'fgta-carousel-dot';
const crl_pages_dotactive = 'fgta-carousel-dot-active';



var lastScreenOrientation;


export function construct(elname) {
	var self = {
		elname: elname,
		showing: null,
	}
	return {
		init: (fn_init) => { return crl_init(self, fn_init) }
	}
}


function crl_init(self, fn_init) {

	lastScreenOrientation = getOrientation();

	var rect = document.getElementById(self.elname).getBoundingClientRect();
	var width = rect.width;
	
	self.el_btn_prev = document.getElementById(self.elname).querySelector('.' + crl_btn_prev_classname);
	self.el_btn_next = document.getElementById(self.elname).querySelector('.' + crl_btn_next_classname);

	crl_dolayout(self, width, true);

	setTimeout(()=>{
		// tambilkan tombol2
		var el_prevnext = document.getElementById(self.elname).querySelector('.' + crl_nextprev_classname);
		// el_prevnext.style.display = 'flex';
		if (typeof fn_init == 'function') {
			fn_init();
		}
	}, 500);




	var calculating = false;
	window.addEventListener('resize', function(event) {
		if (!calculating) {
			var el_crl = document.getElementById(self.elname).querySelector('.' + crl_view_classname);
			if (self.showing!==null) {
				var rect = document.getElementById(self.elname).getBoundingClientRect();
				var crlolder = parseInt(self.showing.getAttribute('crl-order'));
				el_crl.style.marginLeft = `-${crlolder*rect.width}px`;
			}
			calculating = true;
			setTimeout(() => {
				var rect = document.getElementById(self.elname).getBoundingClientRect();
				var width = rect.width;
				crl_dolayout(self, width);
				calculating = false;
				// console.log(width);
			}, 100);
		}	
	});

	self.el_btn_prev.style.visibility = 'hidden';

	self.el_btn_prev.addEventListener("click", (event)=>{
		btn_prev_click(self, event);
	});

	self.el_btn_next.addEventListener("click", (event)=>{
		btn_next_click(self, event);
	});


	document.getElementById(self.elname).addEventListener('touchstart', (event) => {
		crl_touchstart(self, event);
	}, false);
	
	document.getElementById(self.elname).addEventListener('touchmove', (event) => {
		crl_touchmove(self, event);
	}, false);
	
}




function getOrientation() {
	var width = screen.width;
	var height = screen.height;
	var screenOrientation = width > height ? 90 : 0;
	return screenOrientation;
}


function crl_dolayout(self, width, setup) {
	var el_crl = document.getElementById(self.elname).querySelector('.' + crl_view_classname);
	var elimgs = el_crl.querySelectorAll('.fgta-carousel-image');

	var el_pages = document.getElementById(self.elname).querySelector('.' + crl_pages_classname);

	var rotating = false;
	var orientation = getOrientation();
	if (orientation!=lastScreenOrientation) {
		rotating = true;
		lastScreenOrientation = orientation;
	}


	for (var i=0; i<elimgs.length; i++) {
		elimgs[i].style.width = `${width}px`;
		if (self.showing ==null && i==0) {
			self.showing = elimgs[i];
		}

		if (elimgs[i].getAttribute('crl-order')==null) {
			elimgs[i].setAttribute('crl-order', i);
		}

		if (setup) {
			var div = document.createElement('div');
			div.classList.add('fgta-carousel-dot');
			// div.appendChild(document.createTextNode('x'));
			div.setAttribute('seq', i);
			el_pages.appendChild(div);

			if (i==0) {
				div.classList.add('fgta-carousel-dot-active');;
			}
		}
	}
	el_crl.style.opacity = 1;


	if (elimgs.length>1) {
		self.el_btn_next.style.visibility = 'visible';
	} else {
		self.el_btn_next.style.visibility = 'hidden';
	}

	if (rotating) {
		setTimeout(() => {
			var curr_el = self.showing;
			var rect = curr_el.getBoundingClientRect();
			var crlolder = parseInt(curr_el.getAttribute('crl-order'));
			var el_crl = document.getElementById(self.elname).querySelector('.' + crl_view_classname);
			el_crl.style.marginLeft = `-${crlolder*rect.width}px`;
			image_showing(self, crlolder);
		}, 200);

	}

}


function image_showing(self, crlolder) {
	if (self.showing.previousElementSibling!=null) {
		self.el_btn_prev.style.visibility = 'visible';
	} else {
		self.el_btn_prev.style.visibility = 'hidden';
	}

	if (self.showing.nextElementSibling!=null) {
		self.el_btn_next.style.visibility = 'visible';
	} else {
		self.el_btn_next.style.visibility = 'hidden';
	}

	
	var el_dots = document.getElementById(self.elname).querySelectorAll('.' + crl_pages_dot);
	for (var dot of el_dots) {
		dot.classList.remove(crl_pages_dotactive)
	}

	var el_dot_active = document.getElementById(self.elname).querySelector('.' + crl_pages_dot + `[seq="${crlolder}"]`);
	el_dot_active.classList.add(crl_pages_dotactive);
}


function btn_prev_click(self) {
	var rect = self.showing.getBoundingClientRect();
	var el_crl = document.getElementById(self.elname).querySelector('.' + crl_view_classname)
	var prev_el = self.showing.previousElementSibling;
	if (prev_el!=null)  {
		var crlolder = parseInt(prev_el.getAttribute('crl-order'));
		el_crl.style.marginLeft = `-${crlolder*rect.width}px`;
		self.showing = prev_el;
		image_showing(self, crlolder)
	}
}

function btn_next_click(self) {
	var rect = self.showing.getBoundingClientRect();
	var el_crl = document.getElementById(self.elname).querySelector('.' + crl_view_classname)
	var next_el = self.showing.nextElementSibling;
	if (next_el!=null)  {
		var crlolder = parseInt(next_el.getAttribute('crl-order'));
		el_crl.style.marginLeft = `-${crlolder*rect.width}px`;
		self.showing = next_el;
		image_showing(self, crlolder)
	}
}

var xDown = null;                                                        
var yDown = null;

function getTouches(event) {
	return event.touches ||             // browser API
	event.originalEvent.touches; // jQuery
  }   

function crl_touchstart(self, event) {
	const firstTouch = getTouches(event)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;   
}

function crl_touchmove(self, event) {
	if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = event.touches[0].clientX;                                    
    var yUp = event.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
			/* left swipe */ 
			btn_next_click(self);
        } else {
			/* right swipe */
			btn_prev_click(self);
        }                       
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */ 
        } else { 
            /* down swipe */
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null; 
}