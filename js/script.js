$(document).ready(function(){
  var body = document.getElementsByTagName("BODY")[0];
  $('body').wrapInner('<p />');
  $('p').wrapAll('<div id="content" />');
        var request = new XMLHttpRequest();
        request.open('GET', 'js/navbar.html', false);
        request.send();
        var textfileContent = request.responseText;
body.innerHTML += textfileContent;
var t = $("#content").children("p").text().trimStart();
var size = t.match( /[^\.!\?]+[\.!\?]+/g )[0].length.valueOf();

$("#content").children("p").html("<strong>" +t.match( /[^\.!\?]+[\.!\?]+/g )[0]+"</strong>"+ t.substring(size,t.length));
});
