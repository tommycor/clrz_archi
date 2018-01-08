import Component 	from '../Component';

import device 		from './device';

class FixScroll extends Component {
	onInit() {
		this.unFix  = this.unFix.bind( this );
		this.fix    = this.fix.bind( this );

		this.body = document.body;
		this.doc = document.documentElement;
		this.bodyPosition = 0;
		this.state = false;
	}

	fix() {
		this.bodyPosition = {
		    top: device.scroll.top,
		    left: device.scroll.top
		};

		this.body.style.position 	= 'fixed';
		this.body.style.top 		= -this.bodyPosition.top+'px';
		this.body.style.left     	= 0;
		this.state = true;
	}

	unFix(){
		this.body.style.top = 0 + 'px';
		this.body.style.position  = 'relative';

		this.state = false;
		window.scrollTo( 0, this.bodyPosition.top );
	}
}

module.exports = new FixScroll();