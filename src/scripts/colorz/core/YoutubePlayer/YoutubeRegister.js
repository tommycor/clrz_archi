class YoutubeRegister {
    constructor() {
        this.register   = this.register.bind( this );
        this.onInit     = this.onInit.bind( this );

        this.callbacks = new Array();

        this.tag = document.createElement('script');
        this.tag.src = "https://www.youtube.com/player_api";
        this.firstScriptTag = document.getElementsByTagName('script')[0];
        this.firstScriptTag.parentNode.insertBefore(this.tag, this.firstScriptTag);

        window.onYouTubePlayerAPIReady = this.onInit;
    }

    register( callback ) {
        this.callbacks.push( callback );
    }

    onInit() {
        for( var i = 0 ; i < this.callbacks.length ; i++ ) {
            this.callbacks[i]();
        }
    }
}

module.exports = new YoutubeRegister();