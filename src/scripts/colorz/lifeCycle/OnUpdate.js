import BaseLifeCycle from './BaseLifeCycle';

class OnUpdate extends BaseLifeCycle {
	constructor() {
		super( false );

		this.date 		= new Date();
		this.lastDate 	= this.date.getTime();

		this.onEvent();
	}

	onEvent() {
		this.date 		= new Date();
		let currentDate = this.date.getTime();

		this.callCallbacks( currentDate - this.lastDate );

		this.lastDate = currentDate;

		requestAnimationFrame( this.onEvent );

		return;
	}
}

module.exports = new OnUpdate();