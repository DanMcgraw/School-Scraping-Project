$(document).ready(function(){
  var body = document.getElementsByTagName("BODY")[0];

        var options = new XMLHttpRequest();
        options.open('GET', 'https://cors-anywhere.herokuapp.com/https://eservices.minnstate.edu/registration/search/advancedSubmit.html?campusid=304&searchrcid=0304&searchcampusid=304&yrtr=20193&subject=&courseNumber=&courseId=&openValue=OPEN_PLUS_WAITLIST&delivery=ALL&showAdvanced=true&mon=on&tue=on&wed=on&thu=on&fri=on&sat=on&sun=on&starttime=0600&endtime=2300&mntransfer=&credittype=ALL&credits=&instructor=&keyword=&begindate=&site=0304&resultNumber=250', false);
        options.send();
        var textfileContent = options.responseText;
        //var elements = $("div").html(textfileContent)[0];

        var sevenfifty = $(textfileContent).find("#resultsTable");
        var colnum = sevenfifty.closest("td").prevAll("td").length;
        var diva = $("<div id=\"RoomsAndTimes\">");
        sevenfifty.closest("table").find("thead").remove();
        $(sevenfifty).find('tr').each(function() {
    var $tds = $(this).children(),
        $row = $("<tr></tr>");
        $tds.
    $row.append($tds.eq(7)).append($tds.eq(8)).append($tds.eq(13)).appendTo(diva);
});
        $(diva).find('img').each(function(){

                    var str = jQuery(this).attr('alt'),
                    strResult = str.slice(61,65);
                    jQuery(this).replaceWith(strResult);

                 });
$(body).after(diva);
});
