import ImageCoverWrapper from './ImageCoverWrapper'

function imageCoverInit() {
	var wrapperEl = document.querySelectorAll('.js-image-cover-wrapper');

	if( wrapperEl == void 0 || wrapperEl.length == 0 ) { return; }

	var images = new Array();

	setTimeout( ()=>{
		for( var i = 0 ; i < wrapperEl.length ; i++ ) {
			images.push( new ImageCoverWrapper( wrapperEl[i] ) );
		}
	}, 100)
}

module.exports = imageCoverInit();