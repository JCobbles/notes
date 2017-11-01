var { Note } = require('./dbController');

module.exports = {
  getAll: (req, res) => {
    Note.find((err, notes) => {
      if (err)
          res.send(err)

      res.json(notes); // return all notes in JSON format
    });
  },

  getById: (req, res) => {
    Note.find({
      _id: req.params.id
    }, (err, todo) => {
      if (err)
        res.send(err);
      res.json(todo);
    });
  },

  create: (req, res) => {
    Note.create({
        text : req.body.text,
        done : false
    }, (err, todo) => {
        if (err)
            res.send(err);

        // get and return all the notes after you create another
        Note.find(function(err, notes) {
            if (err)
                res.send(err)
            res.json(notes);
        });
    });
  },
  
  update: (req, res) => {

  },

  delete: (req, res) => {
      Note.remove({
          _id : req.params.id
      }, (err, todo) => {
          if (err)
              res.send(err);

          // get and return all the notes after you create another
          Note.find((err, notes) => {
              if (err)
                  res.send(err)
              res.json(notes);
          });
      });
  }
};
