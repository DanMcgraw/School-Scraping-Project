$(document).ready(function() {
    $("#timeSlider").slider({
        min: 0,
        max: 1439,
        step: 15,
        range: true,
        values: [300, 645],
        slide: function(event, ui) {
            var hours = Math.floor(ui.values[0] / 60);
            var minutes = ui.values[0] - (hours * 60);
            if(hours.toString().length == 1) hours = '0' + hours;
            if(minutes.toString().length == 1) minutes = '0' + minutes;

      //If hours is less than 12, append 'am' to end of string.
      //Else, append 'pm' to end of string
	    if(hours < 12) {
		minutes = minutes + "am";
	    } else {
		minutes = minutes + "pm";
	    }
      //Then if hours are greater than 12, subtract 12
      //This removes military time, as we are showing 'am' & 'pm' already.
	    if(hours > 12) {
		hours = hours - 12;
	    } else {
		//cast hours as integer so no extra leading 0 is displayed
		hours = parseInt(hours, 10);
	    }
      //Display the resulting range start time
      //Example = '10:00am'
      //    $('#slider-1').html(hours+':'+minutes);

            var hours2 = Math.floor(ui.values[1] / 60);
            var minutes2 = ui.values[1] - (hours2 * 60);
            if(hours2.toString().length == 1) hours2 = '0' + hours2;
            if(minutes2.toString().length == 1) minutes2 = '0' + minutes2;


      //If hours is less than 12, append AM to end of string.
      //Else, append 'pm' to end of string
	    if(hours2 < 12) {
		minutes2 = minutes2 + "am";
	    } else {
		minutes2 = minutes2 + "pm";
	    }
      //Then if hours are greater than 12, subtract 12
      //This removes military time, as we are showing 'am' & 'pm' already.
	    if(hours2 > 12) {
		hours2 = hours2 - 12;
	    }

      //Display the resulting range end time
      //Example = '2:00pm'
      //    $('#slider-2').html(hours2+':'+minutes2);

      //Display the resulting range start and end time
      //Example = '10:00am-2:00pm'
	    $('#input').html(hours+':'+minutes+'-'+hours2+':'+minutes2);
        }
    });

});
