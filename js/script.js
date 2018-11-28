function txtToHTML(str) {
   var div = document.createElement('div');
   div.innerHTML = str.trim();

   return div.firstChild;
}

$(document).ready(function() {
   var body = document.getElementsByTagName("BODY")[0];
   var request = new XMLHttpRequest();
   request.open('GET', 'js/navbar.html', false);
   request.send();
   var navBar = txtToHTML(request.responseText);
   var pageTitle = document.head.querySelector("[name=title][content]").content;
   navBar.getElementsByTagName("H4")[0].innerHTML = pageTitle;

   var items = navBar.getElementsByTagName("ul")[0].getElementsByTagName("li");
   for (var i = 0; i < items.length; i++) {
      if (items[i].getElementsByTagName("a")[0].textContent == pageTitle) {
         //items[i].remove();
         items[i].setAttribute("style", "list-style-type: disc;list-style-position: inside;");
         break;
      }
   }
   $('body').wrapInner('<p />');
   $('body').wrapInner('<div id="content" />');

   body.appendChild(navBar);
   var t = $("#content").children("p").text().trimStart();
   var size = t.match(/[^\.!\?]+[\.!\?]+/g)[0].length.valueOf();

   $("#content").children("p")[0].html("<strong>" + t.match(/[^\.!\?]+[\.!\?]+/g)[0] + "</strong>" + t.substring(size, t.length));
});