import Component from '../../Component';
import ImageCover from './ImageCover';

module.exports = class ImageCoverWrapper extends Component {

	onInit( el ) {
		this.el = el;
		this.images = new Array();
		this.imagesEl = this.el.querySelectorAll('.js-image-cover');

		if( this.imagesEl == void 0 || this.imagesEl.length == 0 ) { return; }

		for( var i = 0 ; i < _this.imagesEl.length ; i++ ) {
			this.images.push( new ImageCover( _this.imagesEl[i], _this ) )
		}
	}

	onReady() {
		this.onResize();
	}

	onResize() {
		this.width = this.el.offsetWidth;
		this.height = this.el.offsetHeight;
		this.ratio  = this.width / this.height;

		for( var i = 0 ; i < this.images.length ; i++ ) {
			this.images[i].onResize();
		}
	}

}