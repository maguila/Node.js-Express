var express = require("express");
var cors = require('cors');
var bodyParser = require('body-parser');

var app = express();


app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


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

app.post("/update/propiedad", function (req, res) {
    //console.log(Object.keys(req))
    console.log("hola redail rest [POST] .... " + req.body);     
    console.log("hola redail rest [KEYS] .... " + JSON.stringify(req.body, null, 2) );
});


app.listen(3000, function () {
    console.log(" iniciando servidor ...");
});