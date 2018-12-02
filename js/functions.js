function rowToNodeSet(row) {
   var length = row.cells[0].getElementsByTagName('div').length;
   var nodeSet = new Array();
   for (var i = 0; i < length; i++) {
      nodeSet.push(new Node(daysOfWeek(row.cells[0].getElementsByTagName('div')[i].innerHTML), timeConverter(row.cells[1].getElementsByTagName('div')[i].innerHTML), row.cells[2].getElementsByTagName('div')[0].innerHTML));
   }
   return nodeSet;
}

function convertTable(raw) {
   var table = new Array();
   var rowLength = raw.rows.length;
   for (var i = 0; i < rowLength; i++) {
      table = table.concat(rowToNodeSet(raw.rows[i]));
   }
   return table;
}

function pullData(subject) {
   var scrapeData;

   scrapeData = scrape("https://eservices.minnstate.edu/registration/search/advancedSubmit.html?campusid=304&searchrcid=0304&searchcampusid=304&yrtr=20193&subject=" + subject + "&courseNumber=&courseId=&openValue=OPEN_PLUS_WAITLIST&delivery=ALL&showAdvanced=true&mon=on&tue=on&wed=on&thu=on&fri=on&sat=on&sun=on&starttime=0600&endtime=2300&mntransfer=&credittype=ALL&credits=&instructor=&keyword=&begindate=&site=0304&resultNumber=250");
   return scrapeData;
}

function stripNonRooms(raw, rooms) {
   var length = raw.length;
   var roomNums = new Array();
   for (var i = 0; i < rooms.length; i++)
      roomNums.push(rooms[i].number);
   var array = new Array();
   for (var i = 0; i < length; i++) {
      if (hasRoom(raw[i].room, roomNums))
         array.push(raw[i]);
   }
   return array;
}

function hasRoom(num, rooms) {
   for (var i = 0; i < rooms.length; i++) {
      if (num == rooms[i])
         return true;
   }

   return false;
}

function generateTable() {

   return new Promise(function(resolve, reject) {
      if (localStorage.getItem("data") === null) {
         showLoader();

         var preArray = new Array();
         var subjects = scrapeSubjects();
         let pre = {
            a: preArray
         };

         function next(subject, prearray) {
            if (subject.length) {
               //Writes an element specifying the current section being loaded for the user on a loading page
               writeToLoader(subject[0]);
               prearray.a = prearray.a.concat(pullData(subject.shift()));
               $(document).ready(function() {
                  next(subject, prearray);
                  if (!subject.length) {
                     resolve(prearray);
                  }
               });
            }
         };

         next(subjects, pre);


      } else {
         var array = JSON.parse(localStorage.getItem('data'));
         let pre = {
            a: array
         };
         resolve(pre);
      }
   });
}

function testRoomOverlaps(time, data) {
   var times = [1000, 1500, 955, 1150];
   console.log(times);
   console.log(overlapTest(times));
   console.log(time.hours.concat(timeEpoch8(data[0].times)));
   console.log(overlapTest(time.hours.concat(timeEpoch8(data[0].times))));
   for (var i = 0; i < data.length; i++) {
      for (var j = 0; i < roomsArray.length; i++) {
         if (overlapTest(time.hours.concat(timeEpoch8(data[i].times))) && dateContains(data[i].days, time.day))
            setRoomToOccupied(data[i].room, data[i]);
      }
   }
}

function setRoomToOccupied(room, session) {
   for (var i = 0; i < roomsArray.length; i++)
      if (roomsArray[i].number == room) {
         roomsArray[i].classes.push(session);
         roomsArray[i].onOff = false;
      }
}

function dateContains(mtwtf, day) {
   return daysOfWeek(mtwtf).includes(day);
}

function timeConverter(input) {
   input = input.replace(/\:/g, '').replace(/&nbsp;/gi, '');
   var times = input.split("-");
   var timeInt = 0;
   for (var i = 0; i < times.length; i++) {
      if (times[i].includes("pm"))
         timeInt += ((parseInt(times[i], 10) + 1200) * ((i * 9999) + 1));
      else {
         timeInt += (parseInt(times[i], 10) * ((i * 9999) + 1));
      }
   }

   return timeInt;
}

function timeEpoch8(input) {
   var times = [];
   if (String(input).length < 8) {
      var timeString = "0" + input;
   } else {
      var timeString = "" + input;
   }
   times[0] = parseInt(timeString.substring(4, 8));
   times[1] = parseInt(timeString.substring(0, 4));
   return times;
}

function overlapTest(input) {
   //input is array of 4 numbers, event start, event end, class start, class end
   return !((input[1] < input[2]) || (input[0] > input[3]));
}

function daysOfWeek(input) {
   if (!isNaN(input)) {
      var i = 32;
      var output = "";
      do {
         i /= 2;

         if ((input - i) > -1) {
            input -= i;

            switch (i) {
               case 1:
                  output += "Monday";
                  break;
               case 2:
                  output += "Tuesday";
                  break;
               case 4:
                  output += "Wednesday";
                  break;
               case 8:
                  output += "Thursday";
                  break;
               case 16:
                  output += "Friday";
                  break;
               default:
                  break;
            }
         }

      } while (i != 1);
      return output;
   } else {
      var output = 0;
      if (input.includes("Monday")) output += 1;
      if (input.includes("Tuesday")) output += 2;
      if (input.includes("Wednesday")) output += 4;
      if (input.includes("Thursday")) output += 8;
      if (input.includes("Friday")) output += 16;
      return output;
   }
}

function writeToLoader(string) {
   var loaderList = document.getElementById("loader").getElementsByTagName("ul")[0];
   var item = document.createElement('li');
   item.appendChild(document.createTextNode("Now Scraping " + string + " Classes"));
   loaderList.appendChild(item);
}

function showLoader() {
   var body = document.getElementsByTagName("BODY")[0];
   var request = new XMLHttpRequest();
   request.open('GET', 'js/loader.html', false);
   request.send();
   var textfileContent = request.responseText;
   body.innerHTML += textfileContent;
   var loader = document.getElementById("loader");

}

class Room {
   constructor(number, classes, x, y, onOff) {
      this.number = number;
      this.classes = new Array();
      this.x = x;
      this.y = y;
      this.onOff = onOff;
   }
}

class Node {
   constructor(days, times, room) {
      this.days = days;
      this.times = times;
      this.room = room;
   }
}

class Time {
   constructor(day, hours) {
      this.day = day;
      this.hours = hours;
   }
}