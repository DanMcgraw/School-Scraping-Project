$(document).ready(function(){
  var body = document.getElementsByTagName("BODY")[0];

        var options = new XMLHttpRequest();
        options.open('GET', 'https://cors-anywhere.herokuapp.com/https://eservices.minnstate.edu/registration/search/advancedSubmit.html?campusid=304&searchrcid=0304&searchcampusid=304&yrtr=20193&subject=&courseNumber=&courseId=&openValue=OPEN_PLUS_WAITLIST&delivery=ALL&showAdvanced=true&mon=on&tue=on&wed=on&thu=on&fri=on&sat=on&sun=on&starttime=0600&endtime=2300&mntransfer=&credittype=ALL&credits=&instructor=&keyword=&begindate=&site=0304&resultNumber=250', false);
        options.send();
        var textfileContent = options.responseText;
        //var elements = $("div").html(textfileContent)[0];

        var sevenfifty = $(textfileContent).find("#resultsTable");
        var colnum = sevenfifty.closest("td").prevAll("td").length;

        sevenfifty.closest("table").find("tr").find("td:eq(" + colnum+11 + ")").remove();


body.innerHTML+=sevenfifty.text();
});
