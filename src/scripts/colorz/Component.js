import onReady 	from './lifeCycle/OnReady';
import onResize from './lifeCycle/OnResize';
import onScroll from './lifeCycle/OnScroll';
import onUpdate from './lifeCycle/OnUpdate';

module.exports = class Component {

	constructor( el, args ) {
		this._onReady  = this._onReady.bind( this );
		this._onResize = this._onResize.bind( this );
		this._onUpdate = this._onUpdate.bind( this );
		this._onScroll = this._onScroll.bind( this );

		this.isInit 		= false;
		this.isReady 		= false;
		this.isActive		= true;
		this.isLastActive	= null;

		this.idReady 		= null;
		this.idResize 		= null;
		this.idScroll 		= null;
		this.idUpdate 		= null;

		this._onInit( el, args );

		this.idReady = onReady.register( this._onReady );
		this.idResize = onResize.register( this._onResize );
		this.idScroll = onScroll.register( this._onScroll );

		if( this.onUpdate != void 0 ) {
			this.idUpdate = onUpdate.register( this._onUpdate );
		}
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

	_onResize() {
		if( this.onResize != void 0 ) {
			this.onResize();
		}
	}

	_onUpdate( delta ) {
		if( this.isActive && this.isInit ) {
			this.onUpdate( delta );
		}

		if( this.isLastActive != null && this.isLastActive !== this.isActive ) {
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
		onReady.unRegister( this.idReady-1 );
		onResize.unRegister( this.idResize-1 );
		onScroll.unRegister( this.idScroll-1 );
		onUpdate.unRegister( this.idUpdate-1 );
	}

}