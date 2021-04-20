$(document).ready(function(){
    /* Basic Functions */
    $("#lyric-book").load("flip.html")
    $(".content-list-item").click(function(){
        var url = $(this).data("url")
        var index = $(this).data("index")
        sessionStorage.setItem("index", index)
        window.location.replace(url)
    });
    /* Sync Lyrics */

    $.getJSON('../playlist.json', function(data){
        var playlist = data.songs
        var index = sessionStorage.getItem("index")
        var lyricFile = playlist[index]["en"]
        var title = playlist[index]["title"]
        $("#songName").html(title)
        $.getJSON(lyricFile, function(Lyric){
            for (var i = 0; i < Lyric.lyrics.length; i++){
                var line = Lyric.lyrics[i]["line"]
                $("#lyric-wrapper").append("<p>"+line+"</p>")
                $("#lyric-wrapper p:nth-child(4)").addClass("active")
            }
        })
    })
})