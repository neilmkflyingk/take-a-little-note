const path = require('path');
const fs = require('fs')

// npm package creates unique id
var uniqid = require('uniqid');

// routing
module.exports = (app) => {
  // returns saved notes from db.json file
  app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../db/db.json'));
  });
  // POST /api/notes receives note to save to the request body, adds it to db.json file, returns new not to client
  app.post('/api/notes', (req, res) => {
    let db = fs.readFileSync('db/db.json');
    db = JSON.parse(db);
    res.json(db);
    let userNote = {
      title: req.body.title,
      text: req.body.text,
      id: uniqid(),
    };
    db.push(userNote);
    fs.writeFileSync('db/db.json', JSON.stringify(db));
    res.json(db);
  });


  // Delete
  app.delete('/api/notes/:id', (req, res) => {
    // parse notes from db.json file
    let db = JSON.parse(fs.readFileSync('db/db.json'))
    // remove note with selected id
    let deleteNotes = db.filter(item => item.id !== req.params.id);
    // writes db.json file without deleted note
    fs.writeFileSync('db/db.json', JSON.stringify(deleteNotes));
    res.json(deleteNotes);
  })
};