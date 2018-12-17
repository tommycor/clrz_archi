import device 		from './Device';

class FixScroll {
	constructor() {
		this.unFix  		= this.unFix.bind( this );
		this.fix    		= this.fix.bind( this );

		this.body 	= document.body;
		this.doc 	= document.documentElement;
		this.bodyPosition = 0;
		this.state 	= false;
	}

	fix( disableScrollEvents ) {
		this.bodyPosition = {
		    top: device.scroll.top,
		    left: device.scroll.top
		};

		this.body.style.position 	= 'fixed';
		this.body.style.top 		= -this.bodyPosition.top+'px';
		this.body.style.left     	= 0;
		this.state = true;

		if( disableScrollEvents ) {
			this.disableScroll();
		}
	}

	unFix(){
		this.body.style.top 		= 0 + 'px';
		this.body.style.position  	= 'relative';

		this.state = false;
		window.scrollTo( 0, this.bodyPosition.top );

		this.enableScroll();
	}

	disableScroll( event ) {
		if (window.addEventListener)
			window.addEventListener('DOMMouseScroll', this.preventDefault, false);
		window.onwheel = this.preventDefault;
		window.onmousewheel = document.onmousewheel = this.preventDefault;
		window.ontouchmove  = this.preventDefault;
		document.onkeydown  = this.preventDefaultForScrollKeys;
	}

	enableScroll() {
		if (window.removeEventListener)
			window.removeEventListener('DOMMouseScroll', this.preventDefault, false);
		window.onmousewheel = document.onmousewheel = null; 
		window.onwheel = null; 
		window.ontouchmove = null;  
		document.onkeydown = null;  
	}

	preventDefault(e) {
		e = e || window.event;
		if (e.preventDefault)
			e.preventDefault();
		e.returnValue = false;
	}

	preventDefaultForScrollKeys(e) {
		if (keys[e.keyCode]) {
			preventDefault(e);
			return false;
		}
	}
}

export default new FixScroll();