import onReady 	from './lifeCycle/onReady';
import onUpdate from './lifeCycle/onUpdate';

module.exports = class Component {

	constructor( el ) {
		this.el = el;

		this._onReady  = this._onReady.bind( this );
		this._onUpdate = this._onUpdate.bind( this );

		this.isInit 		= false;
		this.isReady 		= false;
		this.isActive		= true;
		this.isLastActive	= true;

		this._onInit();

		onReady.register( this._onReady );

		if( this.onUpdate != void 0 ) {
			onUpdate.register( this._onUpdate );
		}
	}

	_onInit() {
		if( this.onInit != void 0 ) {
			this.onInit();
		}
	}

	_onReady() {
		this.isReady = true;

		if( this.onReady != void 0 ) {
			this.onReady();
		}
	}

	_onUpdate() {
		if( this.isActive ) {
			this.onUpdate();
		}

		if( this.isLastActive !== this.isActive ) {
			if( this.isActive ) {
				this._onActive();
			}
			else {
				this._onDesactivate();
			}
		}

		this.isLastActive = this.isActive;
	}

	_onActivate() {
		if( this.onActivate != void 0 ) {
			this.onActivate();
		}
	}

	_onDesactivate() {
		if( this.onDesactivate != void 0 ) {
			this.onDesactivate();
		}
	}

}