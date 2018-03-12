import Component 	from '../../Component';

import Fader 		from '../../utils/Fader'

module.exports = class Popin extends Component {
	onInit( el, args ) {
		this.onOpen 			= this.onOpen.bind( this );
		this.open 				= this.open.bind( this );
		this.onClose 			= this.onClose.bind( this );
		this.close 				= this.close.bind( this );
		this.stopPropagation 	= this.stopPropagation.bind( this );
		this.remove 			= this.remove.bind( this );

		this.el 		= el;
		this.id 		= this.el.id;
		this.timeout 	= null;
		this.openPopin 	= args.open;
		this.closePopin = args.close;

		this.el.style.display = 'none';
		this.el.style.opacity = 0;

		this.btnOpen	= document.querySelectorAll('.js-popin-open[data-popin="' + this.id + '"]');
		this.btnClose 	= this.el.querySelectorAll('.js-popin-close');
		this.background = this.el.querySelector('.js-popin-bg');

		this.fader 		= new Fader({
			el: this.el,
		});

		if( this.btnOpen != void 0 && this.btnOpen.length != 0 ) {
			for( var i = 0 ; i < this.btnOpen.length ; i++ ) {
				this.btnOpen[i].addEventListener('click', this.onOpen );
			}
		}

		if( this.btnClose != void 0 && this.btnClose.length != 0 ) {
			for( var i = 0 ; i < this.btnClose.length ; i++ ) {
				this.btnClose[i].addEventListener('click', this.onClose );
			}
		}
	}

	onOpen( event ) {
		event.preventDefault();
		this.openPopin( this );
	}

	open() {
		clearTimeout( this.timeout );

		this.fader.in();

		this.el.addEventListener('click', this.stopPropagation );
		if( this.background != void 0 ) {
			this.background.addEventListener('click', this.onClose );
		}
		else {
			window.addEventListener('click', this.onClose );
		}
	}

	onClose() {
		this.closePopin();
	}

	close() {
		this.fader.out();

		this.el.removeEventListener('click', this.stopPropagation );

		if( this.background != void 0 ) {
			this.background.removeEventListener('click', this.onClose );
		}
		else {
			window.removeEventListener('click', this.onClose );
		}
	}

	stopPropagation( event ) {
		event.stopPropagation();
		return;		
	}

	remove() {
		this.close();

		if( this.btnOpen != void 0 && this.btnOpen.length != 0 ) {
			for( var i = 0 ; i < this.btnOpen.length ; i++ ) {
				this.btnOpen[i].removeEventListener('click', this.onOpen );
			}
		}

		if( this.btnClose != void 0 && this.btnClose.length != 0 ) {
			for( var i = 0 ; i < this.btnClose.length ; i++ ) {
				this.btnClose[i].removeEventListener('click', this.onClose );
			}
		}
	}
}