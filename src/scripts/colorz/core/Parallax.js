import Component            from '../Component';

import device               from '../utils/device';
import stylizer             from '../utils/stylizer';
import getAbsoluteOffset    from '../utils/getAbsoluteOffset';
import getData              from '../utils/getData';

module.exports = class Parallax extends Component {

	onInit(el) {
		this.onScroll = this.onScroll.bind(this);

		this.el = el;

		this.height = 0;
		this.width = 0;
		this.itemHeight = 0;
		this.itemWidth = 0;
		this.top = 0;
		this.scroll = 0;
		this.translate = 0;
		this.currentTranslate = 0;
		this.maxTranslate = 0;
		this.maxScroll = 0;
		this.scrollValue = getData(this.el, 'scroll-value');
		this.scrollValue = !this.scrollValue ? .2 : parseFloat(this.scrollValue);
		this.smooth = getData(this.el, 'smooth');
		this.smooth = !this.smooth ? 0.1 : parseFloat(this.smooth);
	}

	onReady() {
		this.onResize();
	}

	onResize(event) {
		this.height = this.el.offsetHeight;
		this.width = this.el.offsetWidth;

		this.top = getAbsoluteOffset(this.el).top;
		this.maxTranslate = device.height * this.scrollValue;
		this.maxScroll = device.height + this.height;

		requestAnimationFrame(this.onScroll);
	}

	onScroll() {
		this.currentScroll = (device.scroll.top + device.height) - this.top - device.height * .5;
		this.translate = this.currentScroll * (this.maxTranslate / device.height);

		this.translate = -this.translate;
	}

	onDesactivate() {
		if (this.translate < 0) {
			this.translate = 0;
			this.currentTranslate = 0;
		}
		else {
			this.translate = this.maxTranslate;
			this.currentTranslate = -this.maxTranslate;
		}
	}

	onUpdate() {
		this.currentTranslate += (this.translate - this.currentTranslate) * this.smooth;

		this.isVisible = this.getIsInViewport(this.top - this.currentTranslate, this.height);

		if (this.isVisible) {
			stylizer.transform(this.el, 'translateY(' + this.currentTranslate + 'px) translateZ(0)');
		}
	}

	getIsInViewport(offsetTop, height) {
		if (offsetTop + height > device.scroll.top && offsetTop < device.scroll.top + device.height) {
			return true;
		}
		else {
			return false;
		}
	}
}