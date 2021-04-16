$(document).ready(function(){
    $("#lyric-book").load("flip.html")
    $(".content-list-item").click(function(){
        var url = $(this).data("url")
        window.location.replace(url)
    });
})