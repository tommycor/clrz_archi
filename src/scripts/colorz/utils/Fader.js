import Component 	from '../Component';

import Easing		from './Easing';

module.exports = class Fader extends Component {
	onInit( args ) {
		this.in		= this.in.bind( this );
		this.out	= this.out.bind( this );

		if( args.el === null ) {
			console.warn('Fader needs an element');
			this.onDestroy();
			return;
		}

		this.el 		= args.el;
		this.duration 	= args.duration !== void 0 ? args.duration : 700;
		this.type 		= args.type 	!== void 0 ? args.type : 'easeInOutQuad';
		this.display 	= args.display 	!== void 0 ? args.display : 'block';
		this.easing 	= null;
	}

	out() {
		this.easing = new Easing({
			type: this.type,
			duration: this.duration,
			start: 1,
			end: 0,
			callback: ()=>{
				this.el.style.display = 'none';
				this.easing.onDestroy();
				this.easing = null;
			}
		})

		this.easing.isActive = true;
	}

	in() {
		this.el.style.display = this.display;

		this.easing = new Easing({
			type: this.type,
			duration: this.duration,
			start: 0,
			end: 1,
			callback: ()=>{
				this.easing.onDestroy();
				this.easing = null;
			}
		})

		this.easing.isActive = true;
	}

	onUpdate() {
		if( this.easing !== null ) {
			this.el.style.opacity = this.easing.value;
		}
	}
}