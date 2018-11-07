$(document).ready(function() {
   var inputBox = document.getElementById('input');
   inputBox.addEventListener("keyup", testFunction);
   var output = document.getElementById('output');

   function testFunction() {
      output.innerHTML = timeConverter(inputBox.value);
   }
});