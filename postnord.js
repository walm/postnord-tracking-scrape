var page = require('webpage').create(),
    system = require('system'),
    url = "http://www.postnord.se/sv/verktyg/sok/Sidor/spara-brev-paket-och-pall.aspx?search=",
    nrs = system.args[1].split(",");

function check(kollis, done) {
  var kolli = kollis.shift();
  page.open(url + kolli, function(){

    console.log("Checking: "+ kolli);
    var status = page.evaluate(function(){
      var output = "";
      $('#itemEvents table tr').each(function(){
        var row = $(this);
        if (!row.hasClass("head")) {
          row.find('td').each(function(){
            var col = $(this);
            output += col.text() +" \t";
          });
          output += "\n";
        }
      });
      return output;
    });

    console.log(status +"\n\n");

    if (kollis.length > 0) {
      check(kollis, done);
    } else {
      done();
    }
  });
}

check(nrs, function(){ phantom.exit(); });


