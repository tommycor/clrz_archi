import creator 			from './colorz/utils/creator';

import VideoPlayer 		from './colorz/core/VideoPlayer';
import YoutubePlayer 	from './colorz/core/YoutubePlayer/YoutubePlayer';

import ImageCoverWrapper 		from './colorz/core/ImageCover/ImageCoverWrapper';



var videoPlayers 	= creator( '.js-video-player', VideoPlayer );
var youtubePlayers 	= creator( '.js-youtube-player', YoutubePlayer );

var imagecovers 	= creator( '.js-image-cover-wrapper', ImageCoverWrapper );