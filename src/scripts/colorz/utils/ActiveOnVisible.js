import Component 			from '../Component';

import getIsInViewport		from './getIsInViewport';
import getAbsoluteOffset 	from './getAbsoluteOffset';
import getData 				from './getData';
import device 				from './device';

module.exports = class ActiveOnVisible extends Component{
	onInit(el) {
		this.el = el;

		this.isInViewport 		= false;
		this.removeOnLeave 		= false;
		this.timout 			= null;
		this.delay				= 0;

		this.removeOnLeave 		= getData( this.el, 'remove-on-leave' );
		this.marginsPourcent 	= getData( this.el, 'margin' );
		this.marginsPourcent 	= !this.marginsPourcent ? .1 : this.marginsPourcent;
		this.delay			 	= getData( this.el, 'delay' );
	}

	onReady() {
		this.onResize();
	}

	onLoad() {
		this.onResize();
	}

	onResize() {
		this.offset  	= getAbsoluteOffset( this.el );
		this.height 	= this.el.offsetHeight;
		this.margins 	= this.marginsPourcent * device.height;

		this.onScroll();
	}

	onScroll() {
		let isInViewport = getIsInViewport(this.offset.top + this.margins, this.height);

		if( isInViewport && !this.isInViewport ) {
			this.isInViewport = isInViewport;

			this.timout = setTimeout( ()=>{
				this.el.classList.add('is-visible');
			}, this.delay);
		}
		else if( this.removeOnLeave && ( !isInViewport && this.isInViewport ) ) {
			clearTimeout( this.timout );
			this.el.classList.remove('is-visible');
			this.isInViewport = isInViewport;
		}
	}
}