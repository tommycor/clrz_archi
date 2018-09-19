import device from '../colorz/utils/device';

function getIsInViewport(offsetTop, height) {
	if( offsetTop + height > device.scroll.top && offsetTop < device.scroll.top + device.height ) {
		return true;
	}
	else {
		return false;
	}
}

module.exports = getIsInViewport;