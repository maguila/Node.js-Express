var express = require("express");
var app = express();
var cors = require('cors');
app.use(cors());

app.get("/all", function (req, res) {
    console.log("hola rest");
    res.setHeader("Content-Type", "application/json")
    var doc = {hola:'hola'};
    res.send(doc);
});

app.listen(3000, function () {
    console.log(" iniciando servidor ...");
});