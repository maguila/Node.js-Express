var express = require("express");
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();

app.use(cors()); // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse application/json

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/redail');

const Propiedades = mongoose.model('Propiedades', { tipo: String, direccion: String });
const ValoresGenerales = mongoose.model('valores_generales', {  });


app.get("/valores/:codigo", function (req, res) {
    console.log("hola redail rest ... get valores_generales, codigo="+ req.params.codigo );
    res.setHeader("Content-Type", "application/json");
    ValoresGenerales.findOne({codigo : req.params.codigo}, function (err, doc) {
        //console.log("find ..." + doc[1].name.toUpperCase());
        res.send(doc);
    });
});



app.get("/all", function (req, res) {
    console.log("hola redail rest ... get propiedades");
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
    console.log("ID = " + req.body._id);

    Propiedades.findById(req.body._id, function(err, obj){        
        
        if (err) return handleError(err);

        //Es mejor usar set()
        //obj.tipo = req.body.tipo;
        //obj.direccion = req.body.direccion;
        obj.set(req.body);

        console.log("save ... req.body.tipo = " + req.body.tipo);
        console.log("save ... objeto id=" + obj._id);
        console.log("save ... objeto tipo=" + obj.tipo);

        obj.save(function(err, updatedObj){
            if (err) return handleError(err);

            console.log("actualizado correctamente ... updatedObj.tipo=" + updatedObj.tipo + "\n");
            res.send(updatedObj);            
        });         
    });    
});


app.listen(3000, function () {
    console.log(" iniciando servidor ...");
});