import Component 	from '../../Component';

import Popin 		from './Popin';

import emitter 		from '../../utils/Emitter';
import FixScroll 	from '../../utils/FixScroll'

class PopinManager extends Component {
	onInit() {
		this.refresh 		= this.refresh.bind( this );
		this.getPopinById 	= this.getPopinById.bind( this );
		this.bindEsc		= this.bindEsc.bind( this );
		this.closePopin		= this.closePopin.bind( this );
		this.openPopin		= this.openPopin.bind( this );
		this.popins 		= new Array();
		this.currentPopin 	= null;
	}

	onReady() {
		this.refresh();
	}

	register( popins ) {
		for( var i = 0 ; i < popins.length ; i++ ) {
			var newPopin 	= popins[i];
			var isDefined 	= false;

			for( var j = 0 ; j < this.popins.length ; j++ ) {
				var oldPopin = this.popins[j];

				this.popins[j].isAttached();

				if( newPopin.id == oldPopin.id ) {
					isDefined = true;
					break;
				}
			}

			if( !isDefined ) {
				this.popins.push( new Popin ( newPopin, { open :this.openPopin, close : this.closePopin} ) );
			}
		}
	}

	openPopin( popin ) {
		if( this.currentPopin !== null ) {
			this.currentPopin.close();
			emitter.emit( 'popin:close', this.currentPopin.id );
		}

		this.currentPopin = popin;

		FixScroll.fix();
		emitter.emit( 'popin:open', this.currentPopin.id );
		this.currentPopin.open();
		document.addEventListener('keyup', this.bindEsc);
	}

	closePopin() {
		if( this.currentPopin !== null ) {
			this.currentPopin.close();
			emitter.emit( 'popin:close', this.currentPopin.id );
		}

		FixScroll.unFix();
		this.currentPopin = null;
		document.removeEventListener('keyup', this.bindEsc);
	}


	bindEsc(event){
		if(27 === event.keyCode) {
			this.closePopin();
		}
	}

	refresh() {
		for( var i = 0 ; i < this.popins.length ; i++ ) {
			this.popins[i].remove();
		}

		var itemsEl = document.querySelectorAll('.js-popin');

		if( itemsEl === void 0 || !itemsEl.length ) { return; }

		this.register( itemsEl );
	}

	getPopinById( id ) {
		for( var i = 0 ; i < this.popins.length ; i++ ) {
			if( this.popins[i].id == id ) {
				return this.popins[i];
			}
		}

		return null;
	}
};

export default new PopinManager();