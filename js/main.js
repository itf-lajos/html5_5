// Audio vezérlő.
//var audioHandler = function ( audio_selector ) {
var audioHandler = function ( div ) {
    
    // Audio elem kiválasztása és mentése.
    this.div = div;
    this.playBtn = div.querySelector( ".play" );
    this.muteBtn = div.querySelector( ".mute" );
    this.fullScreenBtn = div.querySelector( ".full-screen" );
    this.audio = div.querySelector( "audio" );
    this.video = div.querySelector( "video" );
    
    // Constructor.
    this.construct = function () {
        // Ha nincs audio elemünk, akkor videot kezelünk és fordítva
        this.mediaElement = this.audio == null ? this.video : this.audio;
        if ( this.mediaElement == null ) {
            console.error( "Nem található média elem!" );
            return;
        }
        
        // Lejátszó gomb
        var self = this;
        this.playBtn.addEventListener( "click", function() {
//            console.log( this );
            self.div.handler.togglePlay();
//            this.parentNode.handler.togglePlay();
        }, false );
        this.muteBtn.addEventListener( "click", function() {
//            console.log( this );
            self.div.handler.toggleMute();
//            this.parentNode.handler.toggleMute();
        }, false );
        
        // Ha a full-screen gomb létezik, beállítjuk
        if ( this.fullScreenBtn !== null ) {
            this.fullScreenBtn.addEventListener( "click", function() {
                if ( self.video.parentNode.classList.contains( "col-md-12" )) {
                    self.video.parentNode.classList.remove( "col-md-12" );
                    self.video.parentNode.classList.add( "col-md-3" );
                } else {
                    self.video.parentNode.classList.remove( "col-md-3" );
                    self.video.parentNode.classList.add( "col-md-12" );
                }   
            }, false );    
        }
        
    };
    
    // Lejátszás.
    this.play = function() {
        this.mediaElement.play();
    };
    
    // Lejátszás váltása.
    this.togglePlay = function() {
        if ( this.mediaElement.paused ) {
            this.play();
            this.div.classList.add( "played" );
        } else {
            this.pause();
            this.div.classList.remove( "played" );
        }    
    };
    
    // Megállítás.
    this.pause = function() {
        this.mediaElement.pause();
    };

    // Némítás.
    this.muted = function() {
        this.mediaElement.muted = true;
    };

    // Némítás váltása.
    this.toggleMute = function() {
        if ( this.mediaElement.muted ) {
            this.mediaElement.muted = false;
            this.div.classList.remove( "muted" );
        } else {
            this.mediaElement.muted = true;
            this.div.classList.add( "muted" );
        }    
//        this.toggleMute = function() {
//        this.audio.muted = !this.audio.muted;
    };

    // Összes némítása.
    this.muteAll = function() {
        // Összes audio elem kiválasztása.
        var allAudio = document.querySelectorAll( "audio" );
        // Egyenként végigjárjuk az 
        Array.prototype.forEach.call( allAudio, function( item ) {
            item.muted = true;
        });
    };
    
    // Audio léptetése.
    this.setTime = function( cTime ) {
        cTime = parseInt( cTime, 10 );
        if ( isNaN( cTime ) ) {
            console.error( "A megadott értéknek számnak kell lennie!" );
            return;
        }    
        // Megvizsgáljuk, hogy az audio fájl hosszánál ne legyen nagyobb a beállítás.
        cTime = cTime < this.audio.duration ? cTime : this.audio.duration;
        // A pillanatnyi lejátszási hely beállítása
        this.audio.currentTime = cTime;
    };

    this.construct();
};

var audioDivs = document.querySelectorAll( ".media-handler-div");
Array.prototype.forEach.call( audioDivs, function( item ) {
    item.handler = new audioHandler( item );
} );    
//var audio1 = new audioHandler( ".audio1" );
//var audio2 = new audioHandler( ".audio2" );