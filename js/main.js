// Audio vezérlő.
//var audioHandler = function ( audio_selector ) {
var audioHandler = function ( div ) {
    
    // Audio elem kiválasztása és mentése.
    this.div = div;
    this.playBtn = div.querySelector( ".play" );
    this.muteBtn = div.querySelector( ".mute" );
    this.audio = div.querySelector( "audio" );
    
    // Constructor.
    this.construct = function () {
        // Lejátszó gomb
        this.playBtn.addEventListener( "click", function() {
//            console.log( this );
            this.parentNode.handler.togglePlay();
        }, false );
        this.muteBtn.addEventListener( "click", function() {
//            console.log( this );
            this.parentNode.handler.toggleMute();
        }, false );
    };
    
    // Lejátszás.
    this.play = function() {
        this.audio.play();
    };
    
    // Lejátszás váltása.
    this.togglePlay = function() {
        if ( this.audio.paused ) {
            this.play();
            this.div.classList.add( "played" );
        } else {
            this.pause();
            this.div.classList.remove( "played" );
        }    
    };
    
    // Megállítás.
    this.pause = function() {
        this.audio.pause();
    };

    // Némítás.
    this.muted = function() {
        this.audio.muted = true;
    };

    // Némítás váltása.
    this.toggleMute = function() {
        if ( this.audio.muted ) {
            this.audio.muted = false;
            this.div.classList.remove( "muted" );
        } else {
            this.audio.muted = true;
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

var audioDivs = document.querySelectorAll( ".audio-handler-div");
Array.prototype.forEach.call( audioDivs, function( item ) {
    item.handler = new audioHandler( item );
} );    
//var audio1 = new audioHandler( ".audio1" );
//var audio2 = new audioHandler( ".audio2" );