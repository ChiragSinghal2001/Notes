const express = require('express');
const app = express();

const mongoose = require('mongoose');
const note=require('./models/note');

mongoose.connect("mongodb+srv://Chiragsinghal:CS123@slantcoding.ldjfxtd.mongodb.net/?retryWrites=true&w=majority").then(function(){
    app.get("/",function(req,res){
        res.send("this is our homepage");
      });
      app.get("/notes/lists",async function(req,res){
        var notes=await note.find();
          res.json(notes);
        });
        app.get("/notes/add",async function(req,res){
          const newNote=new note({
            id: "0001",
            userid: "008chiragsinghal2001@gmail.com",
            title: "Harry Potter",
            content:  "content is this"
          });
          newNote.save();
            res.json(notes);
          });
});

 app.listen(5000,function(){
    console.log("Server started at PORT:  5000");
 });