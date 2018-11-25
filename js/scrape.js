function scrape(url){
  var options = new XMLHttpRequest();
  //options.open('GET', 'https://cors-anywhere.herokuapp.com/https://eservices.minnstate.edu/registration/search/advancedSubmit.html?campusid=304&searchrcid=0304&searchcampusid=304&yrtr=20193&subject=&courseNumber=&courseId=&openValue=OPEN_PLUS_WAITLIST&delivery=ALL&showAdvanced=true&mon=on&tue=on&wed=on&thu=on&fri=on&sat=on&sun=on&starttime=0600&endtime=2300&mntransfer=&credittype=ALL&credits=&instructor=&keyword=&begindate=&site=0304&resultNumber=250', false);
  options.open('GET', 'https://cors-anywhere.herokuapp.com/'+url, false);
  options.send();
  var textfileContent = options.responseText;
  //var elements = $("div").html(textfileContent)[0];

  var sevenfifty = $(textfileContent).find("#resultsTable");
  var colnum = sevenfifty.closest("td").prevAll("td").length;
  var diva = document.createElement("TABLE");
  sevenfifty.closest("table").find("thead").remove();
  $(sevenfifty).find('tr').each(function() {
     var $tds = $(this).children(),
        $row = $("<tr></tr>");
     $row.append($tds.eq(7)).append($tds.eq(8)).append($tds.eq(13)).appendTo(diva);
  });
  $(diva).find('img').each(function() {

     var str = jQuery(this).attr('alt'),
        strResult = str.slice(61, 65);
     jQuery(this).replaceWith(strResult);

  });
  for (i = 0; i < diva.rows.length; i++) {
     var row = diva.rows[i];
     if (diva.rows[i].cells[0].innerHTML.includes("n/a")) {
        diva.deleteRow(i);
        i--;
        continue;
     }
     $(row).find("div").each(function(element) {
        this.innerHTML = this.innerHTML.trim();
     });


  }
  var table = convertTable(diva);
  return table;
}
