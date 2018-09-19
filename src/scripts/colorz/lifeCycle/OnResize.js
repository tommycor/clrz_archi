import BaseLifeCycle from './BaseLifeCycle';

class OnResize extends BaseLifeCycle {

	constructor() {
		super(true);

		this.checkBody = this.checkBody.bind(this);

		this.bodyHeight = 0;
		this.bodyWidth = 0;

		window.addEventListener('resize', this.onEvent);

		setTimeout(this.checkBody, 200);
	}

	checkBody() {
		let bodyHeight = document.body.offsetHeight;
		let bodyWidth = document.body.offsetWidth;

		if (bodyHeight !== this.bodyHeight || bodyWidth !== this.bodyWidth) {
			this.onEvent();
		}

		this.bodyHeight = bodyHeight;
		this.bodyWidth = bodyWidth;

		setTimeout(this.checkBody, 200);
	}
}

module.exports = new OnResize();