import Component 	from '../colorz/Component';
import creator 		from '../colorz/utils/creator';
import device 		from '../colorz/utils/device';

module.exports = class Form extends Component {
	onInit( el ) {
		this.el = el;
		this.fakeInputs = this.el.querySelectorAll( '.js-input' );
	}

	onReady() {
		this.addHoverFakeInput();
	}

	addHoverFakeInput() {
		for( let i = 0 ; i < this.fakeInputs.length ; i++ ) {
			let input = this.fakeInputs[i];

			input.addEventListener( device.pointerenter, ()=>{
				input.classList.add('is-hover');
			})

			input.addEventListener( device.pointerleave, ()=>{
				input.classList.remove('is-hover');
			})
		}
	}
}