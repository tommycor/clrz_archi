import Component 		from '../../Component';

import device 			from '../../utils/device';
import getData 			from '../../utils/getData';

import YoutubeRegister 	from './YoutubeRegister';

module.exports = class YoutubePlayer extends Component {
	onInit( el ) {
		this.initPlayer     = this.initPlayer.bind(this);
		this.onStateChange  = this.onStateChange.bind(this);
		this.onClick        = this.onClick.bind(this);

		this.el             = el;
		this.elId           = this.el.id;
		this.videoId        = getData( this.el, 'id');
		this.width          = this.el.offsetWidth;
		this.height         = this.el.offsetHeight;
		this.autoplay       = this.el.getAttribute('data-autoplay') != null ? this.el.getAttribute('data-autoplay') : 0;
		this.isControls     = this.el.getAttribute('data-controls') != null ? this.el.getAttribute('data-controls') : 0;
		this.isLoop         = this.el.getAttribute('data-loop') != null ? this.el.getAttribute('data-loop') : 0;
		this.isFullscreen   = this.el.getAttribute('data-fullscreen') != null ? this.el.getAttribute('data-fullscreen') : 1;
		this.player         = null;
		this.isPlaying      = false;

		YoutubeRegister.register( this.initPlayer );
	}

	initPlayer() {
		this.player = new YT.Player(this.elId, {
			height: this.height,
			width: this.width,
			videoId: this.videoId,
			playerVars: {
				autoplay: this.autoplay,
				controls: this.isControls,
				showinfo: this.isControls,
				fs: this.isFullscreen,
				rel : 0,
				iv_load_policy: 3,
				modestbranding: 1
			}
		});

		this.el     = document.querySelector('#'+this.elId);
		this.cover  = document.querySelector('#cover-'+this.elId);
		this.icon   = document.querySelector('#icon-'+this.elId);

		if( this.icon != void 0 ) {
			this.icon.addEventListener(device.pointerdown, this.onClick);
		}
		else {
			this.el.addEventListener(device.pointerdown, this.onClick);
		}
	}

	onClick() {
		if( !this.isPlaying ) {
			this.player.playVideo();
			this.isPlaying = true;

			if( this.cover != void 0 ) {
				this.cover.style.opacity = 0;
			}
			if( this.icon != void 0 ) {
				this.icon.style.opacity = 0;
			}
		}
		else {
			this.player.pauseVideo();
			this.isPlaying = false;

			if( this.cover != void 0 ) {
				this.cover.style.opacity = 1;
			}
			if( this.icon != void 0 ) {
				this.icon.style.opacity = 1;
			}
		}
	}

	onStateChange( event ) {
		if( event.data == 1 ) {

			if( this.cover != void 0 ) {
				this.cover.style.opacity = 0;
			}
			if( this.icon != void 0 ) {
				this.icon.style.opacity = 0;
			}
		}
	}
}