var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to mongo');
});

var noteSchema = mongoose.Schema({
  id: Number,  
  title: String,
  body: String,
  lastUpdated: { type: Date, default: Date.now },
});

var userSchema = mongoose.Schema({
  username: String,
  password: String,
  noteIds: [String],
});

var User = mongoose.model('User', userSchema);
var Note = mongoose.model('Note', noteSchema);

module.exports = {
  Note,
  User,
}
