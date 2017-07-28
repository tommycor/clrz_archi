import Component from '../../Component';
import stylizer from '../../utils/stylizer':

module.exports = class ImageCover extends Component {

	onInit( el, parent ) {
		this.el     = el;
		this.parent = parent;
		this.isDebug  = this.el.getAttribute('data-debug');
	}

	onReady() {
		stylizer.transform( this.el, ' translateX( -50% ) translateY( -50% ) ' );

		this.el.style.top  = '50%';
		this.el.style.left = '50%';
		this.el.style.position  = 'absolute';
		this.el.style.maxWidth  = 'none';
		this.el.style.maxHeight = 'none';

		this.onResize();
	}

	onResize() {
		this.width  = this.el.getAttribute('data-width');
		this.height = this.el.getAttribute('data-height');

		if( this.width == void 0 || this.height == void 0 ) {
			this.width  = this.el.offsetWidth;
			this.height = this.el.offsetHeight;
		}

		this.ratio  = this.width / this.height;

		this.apply();
	}

	apply() {
		if( this.ratio >= this.parent.ratio ) {
			this.el.style.width = 'auto';
			this.el.height = this.parent.height;
		}
		else if( this.ratio < this.parent.ratio ) {
			this.el.style.height = 'auto';
			this.el.width = this.parent.width;
		}
	}
}