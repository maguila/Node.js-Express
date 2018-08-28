const mongoose = require('mongoose');

var propiedadSchema = new mongoose.Schema({
    tipo: String,
    folio: String
});