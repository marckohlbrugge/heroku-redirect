var express = require('express');

var app = express.createServer(express.logger());

var base_url = "https://mail.google.com/mail/?view=cm&fs=1"

// http://localhost:5000/intro/john.doe@example.com/jane.doe@example.com

app.get('/intro(/:email1)?(/:email2)?(/:email3)?(/:email4)?(/:email5)?', function(request, response) {
  var to = new Array();
  var names = Array();
  var params = ['email1', 'email2', 'email3', 'email4', 'email5'];

  params.forEach(function(param) {
    if(request.params[param] && request.params[param][0] != '/')
    {
      to.push(request.params[param]);
      names.push(fetchNameFromEmail(request.params[param]));
    }
  });

  subject = 'Intro: ' + names.join(' <=> ');
  body = "I think you guys should meet!%0A%0A";

  names.forEach(function(name) {
    body += name + " is SHORT_DESCRIPTION_HERE.%0A%0A";
  });

  body += "Let me know if there's anything I can help with!";

  response.redirect(base_url + "&to=" + to.join(',') + '&su=' + subject + '&body=' + body);
});

app.get('/promote', function(request, response) {
  response.redirect("http://bitly.com/simplesend-promote")
});

app.get('*', function(request, response) {
  response.redirect("http://bitly.com/simplesend")
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

function fetchNameFromEmail(string)
{
    string = string.substr(0, string.indexOf('@'));
    string = string.replace(/(\.|_)/g, ' ');
    return string.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
}