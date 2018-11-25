var roomsArray = new Array();
roomsArray.push(new Room(3140, 0, 30, 52, true));
roomsArray.push(new Room(3130, 0, 145, 52, true));
roomsArray.push(new Room(3120, 0, 260, 52, true));
roomsArray.push(new Room(3110, 0, 375, 52, true));
roomsArray.push(new Room(3180, 0, 30, 475, true));
roomsArray.push(new Room(3170, 0, 145, 475, true));
roomsArray.push(new Room(3160, 0, 260, 475, true));
roomsArray.push(new Room(3150, 0, 375, 475, true));

function mapRooms() {
  var rooms = document.querySelectorAll("div[class^='room_']");
  var inputBox = document.getElementById('input');

  if(rooms.length){
    //Rooms have been placed, just need to be updated

    for(var i = 0; i<rooms.length;i++){
    if(rooms[i].className.substring(5,9)==inputBox.value)
    rooms[i].childNodes[0].src = "images/Red_Oval.png";
    else{
      rooms[i].childNodes[0].src = "images/Green_Oval.png";
    }
  }
  }else{
    //rooms need to be placed
   roomsArray.forEach(function(element) {
      insertRoom(element);
   });
 }
}

function insertRoom(room) {
   console.log(room.number);
   var roomDiv = document.createElement("div");
   var roomDivText = document.createElement("div");
   var roomImg = document.createElement("img");
   if (room.onOff)
      $(roomImg).attr("src", "images/Green_Oval.png");
   else {
      $(roomImg).attr("src", "images/Red_Oval.png");
   }
   $(roomImg).get(0).style.transform = "scale(1.5)";
   $(roomDivText).text(room.number);
   $(roomDivText).get(0).style.position = "absolute";
   $(roomDivText).get(0).style.font = "1em";
   $(roomDivText).get(0).style.top = "50%";
   $(roomDivText).get(0).style.left = "50%";
   $(roomDivText).get(0).style.transform = "translate(-50%, -50%)";

   roomDiv.append(roomImg);
   roomDiv.append(roomDivText);
   $(roomDiv).get(0).style.position = "absolute";
   $(roomDiv).get(0).style.top = room.y.toString() + "px";
   $(roomDiv).get(0).style.left = room.x.toString() + "px";
   roomDiv.className = "room_" + room.number;
   $('#highlighted_map').append(roomDiv);
}

// $(document).ready(function() {
//    mapRooms();
// });
