import Component from '../colorz/Component';

module.exports = class Test extends Component {

	constructor( el ) {
		super();
	}

	onInit() {
		console.log( 'init' );
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

	onScroll() {
		console.log( 'onScroll' );
	}

}