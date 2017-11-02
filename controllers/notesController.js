var { Note, User } = require('./dbController');

module.exports = {
  getAll: (req, res) => {
    Note.find({
      _id: { $in: [...user.noteIds] }
    }, (err, notes) => {
      if (err)
        res.send(err)

      res.json(notes); // return all notes in JSON format
    });
  },

  getById: (req, res) => {
    if (isOwnerOfNote(req)) {
      Note.findById(req.params.id, (err, todo) => {
        if (err)
          res.send(err);
        res.json(todo);
      });
    } else {
      failPermission(res);
    }
  },

  create: (req, res) => {
    console.log(req.user);
    Note.create({
      title: req.body.title,
      body: req.body.body
    }, (err, todo) => {
      if (err)
        res.send(err);
      console.log(todo);
      User.findById(req.user._id, (err, user) => {
        user.noteIds.push(todo._id);
        user.save();
        console.log(user);

        Note.find({
          _id: { $in: [...user.noteIds] }
        }, (err, notes) => {
          if (err)
            res.send(err)
          res.json(notes);
        });
      });
    });
  },

  update: (req, res) => {

  },

  delete: (req, res) => {
    if (isOwnerOfNote(req)) {
      Note.remove({
        _id: req.params.id
      }, (err, note) => {
        if (err)
          res.send(err);
        res.json({ success: true, deletedNote: note })
      });
    } else {
      failPermission(res);
    }
  }
};

var isOwnerOfNote = (req) => {
  return req.user && req.user.noteIds.indexOf(req.params.id) > -1;
}

var failPermission = () => {
  res.send(403, "You are not the owner of this note");
}