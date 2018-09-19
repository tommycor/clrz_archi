import Component    		from '../Component';

import device       		from '../utils/device';
import stylizer     		from '../utils/stylizer';
import getAbsoluteOffset    from '../utils/getAbsoluteOffset';

module.exports = class ParallaxParent extends Component {

	onInit( el ) {
		this.onScroll = this.onScroll.bind( this );

		this.el     = el;
		this.item   = this.el.querySelector('.js-parallax-parent-item');

		if( this.item === void 0 || this.item === null ) { return; }

		this.height             = 0;
		this.width              = 0;
		this.itemHeight         = 0;
		this.itemWidth          = 0;
		this.top                = 0;
		this.scroll             = 0;
		this.translate          = 0;
		this.currentTranslate   = 0;
		this.maxTranslate       = 0;
		this.maxScroll          = 0;
	}

	onLoad() {
		if( device.width < 1200 ) {
			this.onDestroy();
			return;
		}

		this.onResize();
	}

	onResize() {
		this.height     	= this.el.offsetHeight;
		this.width      	= this.el.offsetWidth;
		this.itemHeight 	= this.item.offsetHeight;
		this.itemWidth  	= this.item.offsetWidth;

		this.top   			= getAbsoluteOffset( this.el ).top;
		this.maxTranslate   = this.itemHeight - this.height;
		this.maxScroll      = device.height + this.height;

		this.onScroll();
	}

	onScroll() {
		this.currentScroll  = ( device.scroll.top + device.height ) - this.top;
		this.translate      = this.currentScroll * ( this.maxTranslate / this.maxScroll );

		if( this.currentScroll < 0 || this.currentScroll > this.maxScroll ) {
			this.isActive = false;
		}
		else {
			this.isActive = true;
		}

		this.translate = -this.translate;
	}

	onDesactivate() {
		if( this.translate < 0 ) {
			this.translate = 0;
			this.currentTranslate = 0;
		}
		else {
			this.translate = this.maxTranslate;
			this.currentTranslate = -this.maxTranslate;
		}
	}

	onUpdate() {
		this.currentTranslate += ( this.translate - this.currentTranslate ) * 0.02;

		stylizer.transform( this.item, 'translateY(' + this.currentTranslate + 'px) translateZ(0)' );
	}
}