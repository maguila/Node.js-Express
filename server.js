var express = require("express");
var app = express();
var cors = require('cors');
app.use(cors());


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/demo');

const Persona = mongoose.model('Persona', { nombre: String , edad: Number });
const Heroes = mongoose.model('Heroes', { id: Number , name: String });


app.get("/all", function(req, res){
  console.log("hola rest");
  res.setHeader("Content-Type","application/json");
  Persona.find(function(err, doc){
      console.log("find ..." + doc[1].nombre.toUpperCase());
      res.send(doc);
  });
});

app.get("/heroes", function(req, res){
  console.log("hola rest");
  res.setHeader("Content-Type","application/json");

  Heroes.find(function(err, doc){
      console.log("find ..." + doc[0].name.toUpperCase());
      res.send(doc);
  });

});

app.post("/guardar", function(req, res){
  res.send("post response");
});


app.listen(3000, function () {
  console.log(" iniciando servidor ...");
});
