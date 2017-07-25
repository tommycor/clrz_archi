import Component from '../colorz/Component';

module.exports = class Test extends Component {

	constructor( el ) {
		super( el );
	}

	onInit() {
		console.log( 'init' );
	}

	onReady() {
		console.log( 'ready' );
	}

	onUpdate() {
		console.log( 'update' );

		this.isActive = false;
	}

	onActive() {
		console.log( 'update' );
	}

	onDesactivate() {
		console.log( 'onDesactivate' );
	}

}