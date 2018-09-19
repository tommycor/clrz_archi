import Component 			from '../Component';

import getIsInViewport		from '../../utils/getIsInViewport';
import getAbsoluteOffset 	from './getAbsoluteOffset';
import getData 				from './getData';
import device 				from './device';

module.exports = class ActiveOnVisible extends Component{
	onInit(el, args) {
		this.onResize = this.onResize.bind( this );

        this.el = el;
        this.isForceReady = args != void 0 && args.isForceReady != void 0 ? args.isForceReady : false;

		this.isInViewport 		= false;
		this.removeOnLeave 		= false;
		this.timout 			= null;
		this.delay				= 0;

		this.removeOnLeave 		= getData( this.el, 'remove-on-leave' );
		this.marginsPourcent 	= getData( this.el, 'margin' );
		this.marginsPourcent 	= !this.marginsPourcent ? .25 : this.marginsPourcent;
		this.delay			 	= getData( this.el, 'delay' );
		this.delay 				= this.delay != null ? parseInt( this.delay ) : 0;
		this.staggerDelay		= 0;
		this.maxStagger 		= 1000;
		this.isStagger			= getData( this.el, 'stagger' );
		this.isStagger			= this.isStagger != null ? this.isStagger : false;

        if( this.isForceReady )
		    this.onReady();
	}

	onReady() {
        this.onResize();
	}

	onLoad() {
        this.onResize();
	}

	onResize() {
        if(this.el == void 0) {
            return;
        }

		this.offset  	= getAbsoluteOffset( this.el );
		this.height 	= this.el.offsetHeight;
		this.width 		= this.el.offsetWidth;
		this.margins 	= this.marginsPourcent * device.height;

		if( this.isStagger ) {
			this.staggerDelay 	= this.maxStagger * this.offset.left / device.width;
		}

		this.onScroll();

		if( !this.isInViewport ) {
			setTimeout( this.onResize, 200 );
		}
	}

	onScroll() {
        if(this.el == void 0) {
            return;
        }

		let isInViewport = getIsInViewport(this.offset.top + this.margins, this.height);

		if( isInViewport && !this.isInViewport ) {
			this.isInViewport = isInViewport;

			this.timout = setTimeout( ()=>{
				this.el.classList.add('is-visible');
				
			}, this.delay + this.staggerDelay);
		}
		else if( this.removeOnLeave && ( !isInViewport && this.isInViewport ) ) {
			clearTimeout( this.timout );
			this.el.classList.remove('is-visible');
			this.isInViewport = isInViewport;
		}
	}
}