var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const pomieszczenieSchema = new Schema({
  nazwa: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Pomieszczenie", pomieszczenieSchema);
