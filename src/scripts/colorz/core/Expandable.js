import Component 	from '../Component';

import device 		from '../utils/device';
import Slide 		from '../utils/Slide';

module.exports = class Expandable extends Component {
	onInit( el ) {
		this.onPointerdown 	= this.onPointerdown.bind( this );

		this.el 		= el;
		this.btn 		= this.el.querySelector('.js-expendable-btn');
		this.wrapper 	= this.el.querySelector('.js-expendable-wrapper');
		this.isOpen 	= false;

		if( this.wrapper === null || this.btn === null ) {
			this.onDestroy();
			return;
		}

		this.slide = new Slide( this.wrapper );
	}

	onReady() {
		this.el.addEventListener( device.pointerdown, this.onPointerdown );
		this.style = window.getComputedStyle( this.wrapper );

		if( this.style.display !== 'none' ) {
			this.isOpen = true;
		}
	}

	onPointerdown() {
		if( !this.isOpen ) {
			this.open();
		}
		else {
			this.close();
		}
	}

	open() {
		this.slide.down( 'easeOutQuart', 500 );
		this.isOpen = true;
		this.btn.classList.add('is-open');
	}

	close() {
		this.slide.up( 'easeOutQuart', 500 );
		this.isOpen = false;
		this.btn.classList.remove('is-open');
	}
}