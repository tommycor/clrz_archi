import BaseLifeCycle from './BaseLifeCycle';

class OnLoad extends BaseLifeCycle {

	constructor() {
		super( true );

		window.onload = this.onEvent;
	}
}

module.exports = new OnLoad();

