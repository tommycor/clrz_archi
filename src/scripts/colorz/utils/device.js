import Component from '../Component';

class Device extends Component {
	onInit() {
		this.width 	= 0;
		this.height = 0;

		this.isTouch 	= ('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0);
		this.isIpad 	= navigator.userAgent.match(/.*(iPad).*/) ? true : false;
		this.isIphone 	= navigator.userAgent.match(/.*(iPhone).*/) ? true : false;
		this.isAndroid 	= navigator.userAgent.match(/.*(Android).*/) ? true : false;
		this.isFirefox 	= navigator.userAgent.match(/.*((f|F)irefox).*/) ? true : false;

		this.pointer 		= !!window.navigator.pointerEnabled;
		this.msPointer 		= !!window.navigator.msPointerEnabled;;
		this.pointerdown 	= this.isTouch ? 'touchstart' : (this.pointer ? 'pointerdown' : (this.msPointer ? 'MSPointerDown' : 'mousedown') );
		this.pointerup 		= this.isTouch ? 'touchend' : (this.pointer ? 'pointerup' : (this.msPointer ? 'MSPointerUp' : 'mouseup') );
		this.pointermove 	= this.isTouch ? 'touchmove' : (this.pointer ? 'pointermove' : (this.msPointer ? 'MSPointerMove' : 'mousemove') );
		this.pointerenter 	= this.isTouch ? 'touchstart' : (this.pointer ? 'pointerenter' : (this.msPointer ? 'mouseover' : 'mouseover') );
		this.pointerleave 	= this.isTouch ? 'touchend' : (this.pointer ? 'pointerleave' : (this.msPointer ? 'mouseout' : 'mouseout') );
	}

	onReady() {
		this.onResize();
	}

	onResize() {
		this.width 	= window.innerWidth;
		this.height = window.innerHeight;
	}

	getScroll() {
		let doc = document.documentElement;

		return {
			left: (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0),
			top:  (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0)
		}
	}
}

module.exports = new Device();