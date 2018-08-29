var express = require("express");
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
const mongoose = require('mongoose');
var propiedadSchema = require('./schemas.js');

app.use(cors()); // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse application/json

mongoose.connect('mongodb://localhost/redail');

//Schemas y modelos
var propiedadSchema = new mongoose.Schema({ tipo: String }, { strict: false, versionKey: false });
const Propiedades = mongoose.model('propiedades', propiedadSchema);
const ValoresGenerales = mongoose.model('valores_generales', { });


app.get("/valores/:codigo", function (req, res) {    
    var cod = req.params.codigo;
    console.log("hola redail rest ... get valores_generales, codigo="+ req.params.codigo );
    res.setHeader("Content-Type", "application/json");
    ValoresGenerales.findOne({codigo : cod.toUpperCase()}, function (err, doc) {
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

    //es nueva propiedad
    if(req.body._id == undefined){
        //req.body
        console.log("nueva propiedad folio=" + req.body.folio);
        console.log("nueva propiedad tipo=" + req.body.tipo);

        const propiedad = new Propiedades(req.body);
        propiedad.save().then(function(){
            console.log("propidad guardada");
        });
        
    //propiedad existente    
    }else{
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
    }


});


app.listen(3000, function () {
    console.log(" iniciando servidor ...");
});