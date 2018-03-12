import Component 	from '../Component';

import device 		from '../utils/device';

module.exports = class VideoPlayer extends Component {
	onInit( el ) {
		this.toggle = this.toggle.bind( this );

		this.el 	= el;
		this.elId   = this.el.id;
		this.cover  = document.querySelector('#cover-'+this.elId);
		this.icon   = document.querySelector('#icon-'+this.elId);
		this.isPlaying = false;

		this.autoplay 	= this.el.getAttribute('data-autoplay') != null ? this.el.getAttribute('data-autoplay') : true;
		this.isLoop     = this.el.getAttribute('data-loop') != null ? this.el.getAttribute('data-loop') : 0;

		if( this.autoplay == 'true' ) {
			this.play();
			this.el.volume = 0;
		}
		else if(  this.autoplay == 'false' ) {
			this.pause();
		}
		if( this.isLoop ) {
			this.el.loop = true;
		}

		if( this.icon != void 0 ) {
			this.icon.addEventListener(device.pointerdown, this.toggle);
		}
		else {
			this.el.addEventListener(device.pointerdown, this.toggle);
		}
	}

	toggle() {
		if( this.isPlaying ) {
			this.pause();
		}
		else {
			this.play();
		}
	}

	play() {
		this.el.play();
		this.el.classList.add('is-playing');
		this.isPlaying = true;

		if( this.cover != void 0 ) {
			this.cover.style.opacity = 0;
		}
		if( this.icon != void 0 ) {
			this.icon.style.opacity = 0;
		}
	}

	pause() {
		this.el.pause();
		this.el.classList.remove('is-playing');
		this.isPlaying = false;

		if( this.cover != void 0 ) {
			this.cover.style.opacity = 1;
		}
		if( this.icon != void 0 ) {
			this.icon.style.opacity = 1;
		}
	}
}