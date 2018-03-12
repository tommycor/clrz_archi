import Component 	from '../Component';

import Easing 		from './Easing';

module.exports = class Slide extends Component {
	onInit( el ) {
		this.down 	= this.down.bind( this );
		this.up 	= this.up.bind( this );

		this.el 		= el;
		this.easing 	= null;
		this.height 	= 0;
		this.style 		= null;
		this.display 	= null;
		this.position 	= null;
		this.visibility = null;
	}

	onUpdate() {
		if( this.easing !== null && this.el !== null ) {
			this.el.style.maxHeight = this.easing.value + 'px';
		}
	}

	down( easing, duration, callback ) {
		this.ease 		= easing !== void 0 ? easing : 'easeInOutQuart';
		this.duration 	= duration !== void 0 ? duration : 1000;
		this.callback 	= callback !== void 0 ? callback : ()=>{};

		this.resetEasing();
		this.getHeight();

		this.el.style.overflowY = 'hidden';
		this.el.style.maxHeight = 0;
		this.el.style.display 	= 'block';

		if( this.height === 0 ) {
			this.callback();
			return;
		}

		this.easing = new Easing( {
			type: this.ease,
			duration: this.duration,
			start: 0,
			end: this.height,
			callback: () => {
				this.easing.isActive = false;
				this.easing.onDestroy();
				this.easing = null;
				this.callback();
			}
		});
		this.easing.isActive = true;
	}

	up( easing, duration, callback ) {
		this.ease 		= easing !== void 0 ? easing : 'easeInOutQuart';
		this.duration 	= duration !== void 0 ? duration : 1000;
		this.callback 	= callback !== void 0 ? callback : ()=>{};

		this.resetEasing();
		this.getHeight();

		this.easing = new Easing( {
			type: this.ease,
			duration: this.duration,
			start: this.height,
			end: 0,
			callback: () => {
				this.easing.isActive = false;
				this.easing.onDestroy();
				this.easing = null;
				this.el.style.position 		= this.el.style.position;
				this.el.style.visibility 	= this.el.style.visibility;
				this.el.style.display 		= this.el.style.display;
				this.callback();
			}
		});
		this.easing.isActive = true;
	}

	getHeight() {
		if( this.height !== 0 ) {
			return this.height;
		}

		this.style 		= window.getComputedStyle( this.el );
		this.display    = this.style.display;
		this.position   = this.style.position;
		this.visibility = this.style.visibility;
		this.maxHeight 	= this.style.maxHeight.replace('px', '').replace('%', '');

		if( this.display !== 'none' && this.height !== '0') {
			this.height = this.el.offsetHeight;
			return this.height;
		}

		this.el.style.position   = 'absolute';
		this.el.style.visibility = 'hidden';
		this.el.style.display    = 'block';

		this.height = this.el.offsetHeight;

		this.el.style.position   = this.position;
		this.el.style.visibility = this.visibility;
		this.el.style.display    = this.display;

		return this.height;
	}

	resetEasing() {
		if( this.easing !== null ) {
			this.easing.onDestroy();
			this.easing = null;
		}
	}
}
