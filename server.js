var express = require("express");
var app = express();
var cors = require('cors');
app.use(cors());

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/demo');

const Hero    = mongoose.model('Heroes', {name: String});
const Persona = mongoose.model('Personas', {nombre: String, apellido: String});


app.get("/all", function(req, res){
  console.log("hola rest");
  res.setHeader("Content-Type","application/json");
  Persona.find(function(err, doc){
      //console.log("find ..." + doc[1].name.toUpperCase());
      res.send(doc);
  }); 
});

app.get("/heroes", function(req, res){
  console.log("hola rest");
  res.setHeader("Content-Type","application/json");

  Hero.find(function(err, doc){
      console.log("find ..." + doc[0].name.toUpperCase());
      res.send(doc);
  });
});

app.get("/heroes/:id", function(req, res){
  var idParam = parseInt(req.params.id);

  console.log("hola rest /heroes .. " + idParam);
  res.setHeader("Content-Type","application/json");
  Hero.findOne({id:idParam},function(err, doc){
    res.send(doc);
  });
});

app.post("/guardar", function(req, res){
  res.send("post response");
});

app.post("/guardar", function(req, res){
  res.send("post response");
});


app.listen(3000, function () {
  console.log(" iniciando servidor ...");
});
