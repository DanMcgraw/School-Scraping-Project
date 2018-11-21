function rowToNodeSet(row) {
   return row.cells[0].getElementsByTagName('div').length;
}



function timeConverter(input) {
   input = input.replace(/\:/g, '');
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
   times[0] = timeString.substring(4, 8);
   times[1] = timeString.substring(0, 4);
   return times;
}

function overlapTest(input) {
   //input is array of 4 numbers, event start, event end, class start, class end
   return (((input[0] < input[2]) && (input[1] < input[2])) || ((input[0] > input[3]) && (input[1] > input[3])));
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

class Room {
   constructor(number, classes, x, y, onOff) {
      this.number = number;
      this.classes = classes;
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