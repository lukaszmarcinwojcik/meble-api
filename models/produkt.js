// import mongoose from 'mongoose';
// const { Schema } = mongoose;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const produktSchema = new Schema({
  nazwa: { type: String, required: true },
  rodzaj: { type: String, require: true },
  kolekcja: { type: String, require: true },
  material: { type: String, require: true },
  pomieszczenie: { type: String, require: true },
  nazwapliku: { type: String, require: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Produkt", produktSchema);
