var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var passport = require('passport');
var expressSession = require('express-session');
var flash = require('connect-flash');

const loginController = require('./controllers/loginController');
const notesController = require('./controllers/notesController');

app.set('port', (process.env.PORT || 3000));

app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(expressSession({secret: 'mxckvwuy3l4n202m3t0ul923vfto'}));
app.use(passport.initialize());
app.use(passport.session());

require('./utilities/passportConfigurer')(passport);

app.use(express.static(__dirname + '/public'));

app.post('/api/login', loginController.login);

app.post('/api/register', loginController.register);

app.post('/api/create', notesController.create);

app.delete('/api/delete/:id', notesController.delete);

app.get('/api/notes', notesController.getAll);

app.get('/api/notes/:id', notesController.getById);

app.put('/api/update/:id', notesController.update);

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});

//TEMPORARY:
app.get('/home', function(request, response) {
  response.sendFile(__dirname + '/home.html');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
