var express = require("express");
var app = express();
var cors = require('cors');
app.use(cors());

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/redail');

const Propiedades = mongoose.model('Propiedades', {  });


app.get("/all", function (req, res) {
    console.log("hola redail rest");
    res.setHeader("Content-Type", "application/json");
    Propiedades.find(function (err, doc) {
        //console.log("find ..." + doc[1].name.toUpperCase());
        res.send(doc);
    });
});

app.listen(3000, function () {
    console.log(" iniciando servidor ...");
});