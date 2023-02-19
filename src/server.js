const express = require('express');
const app = express();

const mongoose = require('mongoose');
const Note = require('./models/note');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://Chiragsinghal:CS123@slantcoding.ldjfxtd.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(function(){
  mongoose.set('strictQuery', false);

  app.get("/", function(req, res) {
    res.send("This is our homepage");
  });

  app.get("/notes/lists/:userid", async function(req, res) {
    try {
      const notes = await Note.find({userid: req.params.userid});
      res.json(notes);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/notes/add", async function(req, res) {
    try {
      const newNote = new Note({
        id: req.body.id,
        userid: req.body.userid,
        title: req.body.title,
        content: req.body.content
      });
      await newNote.save();
      res.json({ message: "New note created!", note: newNote });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.listen(3000, function() {
    console.log("Server started at PORT: 3000");
  });
}).catch(function(error) {
  console.error(error);
});