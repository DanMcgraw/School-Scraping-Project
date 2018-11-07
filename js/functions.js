function rowToNodeSet(row) {

}

function timeConverter(input) {
   input = input.replace(/\:/g, '');
   var times = input.split("-");
   var timeInt = 0;
   for (var i = 0; i < times.length; i++) {
      alert(parseInt(times[i], 10));
      if (times[i].includes("pm"))
         timeInt += (parseInt(times[i], 10) * ((i * 9999) + 1)) + 1200;
      else {
         timeInt += (parseInt(times[i], 10) * ((i * 9999) + 1));
      }
   }

   return timeInt;
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

class Node {
   constructor(days, times, room) {
      this.days = days;
      this.times = times;
      this.room = room;
   }
}