$(document).ready(function(){
  var body = document.getElementsByTagName("BODY")[0];
  $('p').wrapAll('<div id="content" />');
        var request = new XMLHttpRequest();
        request.open('GET', 'js/navbar.html', false);
        request.send();
        var textfileContent = request.responseText;
body.innerHTML += textfileContent;
var t = $("#content").children("p").text();
var size = t.match( /[^\.!\?]+[\.!\?]+/g )[1].length.valueOf();
$("#content").children("p").html("<strong>" +t.match( /[^\.!\?]+[\.!\?]+/g )[1]+"</strong>"+ t.substring(parseInt(size)+2,t.length));
});
