$(document).ready(function(){

    $("#lyric-book").load("flip.html")

    $(".content-list-item").click(function(){

        var url = $(this).data("url")
        var index = $(this).data("index")

        sessionStorage.setItem("index", index)
        window.location.replace(url)

    });

    $.getJSON('../playlist.json', function(data){

        var playlist = data.songs
        var index = sessionStorage.getItem("index")
        var lyricFile = playlist[index]["en"]
        var title = playlist[index]["title"]
        var thumb = playlist[index]["thumb"]

        var seekslider = document.getElementById("seekslider")
        var curtimetext = document.getElementById("startTime")
        var durtimetext = document.getElementById("endTime")
        var playbtn = document.getElementById("playPause")
        var prevbtn = document.getElementById("prevSong")
        var nextbtn = document.getElementById("nextSong")
        var repeat = document.getElementById("repeat")
        var shuffle = document.getElementById("shuffle")
        var seeking = false 

        var audio = new Audio()
        audio.src = playlist[index]["audio"]
        audio.loop = false
        //If want to auto play on pageload 
        audio.play()
        $("#playBtn").hide()
        $("#pauseBtn").show()

        $("#songName, #song-title").html(title)
        $("#song-thumbnail").attr("src",thumb)

        playbtn.addEventListener("click", playPause)
        nextbtn.addEventListener("click", nextSong)
        prevbtn.addEventListener("click", prevSong)
        repeat.addEventListener("click", repeatSong);
        shuffle.addEventListener("click", shuffleList)
        seekslider.addEventListener("mousedown", function(event){
            seeking = true; 
            seek(event);
        })
        seekslider.addEventListener("mousemove", function(event){
            seek(event);
        })
        seekslider.addEventListener("mouseup", function(event){
            seeking = false; 
        })
        audio.addEventListener("timeupdate", function(){
            seektimeupdate()
        })
        audio.addEventListener("ended", function(){
            $("#playBtn").show()
            $("#pauseBtn").hide()
        })

        function getSongDetails() {
            title = playlist[index]["title"]
            thumb = playlist[index]["thumb"]
            lyricFile = playlist[index]["en"]

            $("#songName, #song-title").html(title)
            $("#song-thumbnail").attr("src",thumb)

            audio.src = playlist[index]["audio"]

            $("#playBtn").hide()
            $("#pauseBtn").show()

            audio.play()

            displayLyric()
            
        }
        
        function playPause() {
            if (audio.paused){
                audio.play()
            } else {
                audio.pause()
            }
            $("#playPause svg").toggle()
        }

        function nextSong() {
            index++
            if (index > playlist.length - 1){
                index = 0
            }
            getSongDetails()
        }

        function prevSong() {
            index--
            if (index < 0){
                index = playlist.length - 1;
            }
            getSongDetails()
        }

        function seek(event){
            if (audio.duration == 0){
                null
            } else {
                if (seeking){
                    let rect = seekslider.getBoundingClientRect()
                    let wrapperLeft = Math.round(rect.left); 
                    let clientLeft = Math.round(event.clientX); 
                    let value = clientLeft - wrapperLeft;
                    let inputWidth = Math.round(rect.width)
                    let seekTime = Math.round( ( audio.duration * value ) / inputWidth )
                    audio.currentTime = seekTime; 
                }
            }
        }

        function seektimeupdate(){
            

        }

        displayLyric()

        function displayLyric() {

            $("#lyric-wrapper").html("")
            sessionStorage.removeItem("lyricJSON")

            $.getJSON(lyricFile, function(Lyric){

                sessionStorage.setItem("lyricJSON", JSON.stringify( Lyric.lyrics ))

                var lyricJSON = sessionStorage.getItem("lyricJSON")

                var lyricObj = JSON.parse(lyricJSON)

                for (var i = 0; i < lyricObj.length; i++) {

                    var line = lyricObj[i]["line"]
                    
                    $("#lyric-wrapper").append("<p>"+ line +"</p>")

                }
             
            })/* Sync Lyrics */
        }
        
        function repeatSong() {
            console.log("repeat song")
        }

        function shuffleList() {
            console.log("shuffle playlist")
        }

    }) 
    
})