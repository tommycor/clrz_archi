import Component from '../colorz/Component';

module.exports = class Test extends Component {

	onInit( el ) {
		console.log( 'init' );

		this.el = el;
		this.isActive = true;
	}

	onReady() {
		console.log( 'ready' );
	}

	onUpdate( delta ) {
		// console.log( 'update', delta );
	}

	onActivate() {
		console.log( 'onActivate' );
	}

	onDesactivate() {
		console.log( 'onDesactivate' );
	}

	onResize() {
		console.log( 'onResize' );
	}

	onScroll() {
		console.log( 'onScroll' );
	}
}