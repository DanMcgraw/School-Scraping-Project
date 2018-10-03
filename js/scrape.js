$(document).ready(function(){
  var body = document.getElementsByTagName("BODY")[0];
  var name = "codemzy";
  var url = "http://anyorigin.com/go?url=" + encodeURIComponent("https://eservices.minnstate.edu/registration/search/advancedSubmit.html?campusid=304&searchrcid=0304&searchcampusid=304&yrtr=20193&subject=&courseNumber=&courseId=&openValue=OPEN_PLUS_WAITLIST&delivery=ALL&showAdvanced=true&mon=on&tue=on&wed=on&thu=on&fri=on&sat=on&sun=on&starttime=0600&endtime=2300&mntransfer=&credittype=ALL&credits=&instructor=&keyword=&begindate=&site=0304&resultNumber=250") + name + "&callback=?";
  $.get(url, function(response) {
    console.log(response);
  });
});
