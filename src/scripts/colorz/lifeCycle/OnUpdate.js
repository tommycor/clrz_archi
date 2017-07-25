import BaseLifeCycle from './BaseLifeCycle';

class OnUpdate extends BaseLifeCycle {
	constructor() {
		super( false );

		this.onEvent();
	}

	onEvent() {
		this.callCallbacks( event );

		requestAnimationFrame( this.onEvent );

		return;
	}
}

module.exports = new OnUpdate();