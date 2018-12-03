$(document).ready(function() {
  var inputBox = document.getElementById('input');
  inputBox.addEventListener("keyup", testFunction);
  var output = document.getElementById('output');
  var table;

    table = generateTable()
.then(function(resolve)
{
  var array = stripNonRooms(resolve.a, roomsArray);
  localStorage.setItem('data', JSON.stringify(array));
  //hides the loader when it is complete
  var loader = document.getElementById("loader");
  if (loader != null)
     loader.style.display = "none";

  mapRoomsLoaded(array);
})


  function testFunction() {
    output.innerHTML = timeEpoch8(timeConverter(inputBox.value));
    output.innerHTML += "<br />";
    output.innerHTML += timeConverter(inputBox.value);
    output.innerHTML += "<br />";
    output.innerHTML += daysOfWeek(inputBox.value);
    output.innerHTML += "<br />";
    output.innerHTML += JSON.stringify(table[4]);
  }
});
