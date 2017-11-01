var express = require('express');

const bodyParser= require('body-parser');
var app = express();
// var db = require('./db');

// app.use(express.static(__dirname + '/src'));                 // set the static files location /src/img will be /img for users

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/src/index.html');
  console.log(req.body);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});