import Component from '../Component';

import getData from './getData';


module.exports = class ActiveOnReady extends Component {
	onInit( el ) {
		this.el = el;

		this.delay 			= getData( this.el, "activation-delay" );
		this.isRemove 		= getData( this.el, "remove" );
		this.removeDelay 	= getData( this.el, "remove-delay" );
	}

	onReady() {
		if( !this.delay ) {
			this.el.classList.add('is-active');
			this.remove();
		}
		else {
			setTimeout( ()=>{
				this.el.classList.add('is-active');
				this.remove();
			}, parseInt( this.delay ) );
		}
	}

	remove() {
		if( this.isRemove ) {
			if( this.removeDelay ) {
				setTimeout( ()=>{
					this.el.style.display = 'none'
				}, this.removeDelay);
			}
			else {
				this.el.style.display = 'none'
			}
		}
	}
}