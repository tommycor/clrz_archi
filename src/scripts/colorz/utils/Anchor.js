import Component 			from '../Component';

import device 				from './device';
import getData 				from './getData';
import Easing 				from './Easing';
import getAbsoluteOffset 	from './getAbsoluteOffset';

module.exports = class Anchor extends Component {
	onInit( el ) {
		this.el 	= el;
		this.target = document.querySelector( getData( this.el, 'target' ) );
		this.easing = null;
	}

	onReady() {
		if( this.target === void 0 ) { return; }

		this.onResize();

		this.el.addEventListener(device.pointerdown, ()=>{
			this.easing = new Easing({
				type: 'easeInOutQuad',
				duration: 800,
				start: device.scroll.top,
				end: this.offset.top,
				callback: ()=>{
					this.easing.onDestroy();
					this.easing = null;
				}
			});
			this.easing.isActive = true;
		});
	}

	onUpdate() {
		if( this.easing === null ) { return; }

		window.scrollTo( 0, this.easing.value );
	}

	onResize() {
		this.offset = getAbsoluteOffset( this.target );
	}
}