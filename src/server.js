const express = require('express');
const app = express();

const mongoose = require('mongoose');
const note=require('./models/note');

mongoose.connect("mongodb+srv://Chiragsinghal:CS123@slantcoding.ldjfxtd.mongodb.net/?retryWrites=true&w=majority").then(function(){
    app.get("/",function(req,res){
        res.send("this is our homepage");
      });
      app.get("/notes/lists/:userid",async function(req,res){
        var notes=await note.find({userid: req.params.userid});
          res.json(notes);
        });
        app.get("/notes/add",async function(req,res){
          const newNote =new note({
            id: "0018",
            userid: "008chirag@gmail.com",
            title: "Harry Potter",
            content:  "content is this"
          });
          await newNote.save();
          const response={message: " New Note Created!"};
            res.json(newNote);
          });
});

 app.listen(3000,function(){
    console.log("Server started at PORT:  3000");
 });