import onReady 	from './lifeCycle/OnReady';
import onLoad 	from './lifeCycle/OnLoad';
import onResize from './lifeCycle/OnResize';
import onScroll from './lifeCycle/OnScroll';
import onUpdate from './lifeCycle/OnUpdate';

module.exports = class Component {

	constructor( el, args ) {
		this._onReady  = this._onReady.bind( this );
		this._onLoad   = this._onLoad.bind( this );
		this._onResize = this._onResize.bind( this );
		this._onUpdate = this._onUpdate.bind( this );
		this._onScroll = this._onScroll.bind( this );

		this.isInit 		= false;
		this.isReady 		= false;
		this.isActive		= true;
		this.isLastActive	= null;

		this.idReady 		= null;
		this.idLoad 		= null;
		this.idResize 		= null;
		this.idScroll 		= null;
		this.idUpdate 		= null;

		this.idReady    = onReady.register( this._onReady ) - 1;
		this.idLoad     = onLoad.register( this._onLoad ) - 1;
		this.idResize   = onResize.register( this._onResize ) - 1;
		this.idScroll   = onScroll.register( this._onScroll ) - 1;

		if( this.onUpdate != void 0 ) {
			this.idUpdate = onUpdate.register( this._onUpdate ) - 1;
		}

		this._onInit( el, args );
	}

	_onInit( el, args ) {
		this.isInit = true;

		this.onInit( el, args );
	}

	_onReady() {
		this.isReady = true;

		if( this.onReady != void 0 ) {
			this.onReady();
		}
	}

	_onLoad() {
		if( this.onLoad != void 0 ) {
			this.onLoad();
		}
	}

	_onResize() {
		if( this.onResize != void 0 ) {
			this.onResize();
		}
	}

	_onUpdate( delta ) {
		if( this.isActive && this.isInit ) {
			this.onUpdate( delta );
		}

		if( this.isLastActive !== null && this.isLastActive !== this.isActive ) {
			if( this.isActive ) {
				this._onActivate();
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

	_onScroll() {
		if( this.onScroll != void 0 ) {
			this.onScroll();
		}
	}

	onDestroy() {
		if( this.idReady !== null ) {
			onReady.unRegister( this.idReady );
		}
		if( this.idLoad !== null ) {
			onLoad.unRegister( this.idLoad );
		}
		if( this.idResize !== null ) {
				onResize.unRegister( this.idResize );
		}
		if( this.idScroll !== null ) {
				onScroll.unRegister( this.idScroll );
		}
		if( this.idUpdate !== null ) {
				onUpdate.unRegister( this.idUpdate );
		}
	}

}