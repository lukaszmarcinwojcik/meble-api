var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const rodzajSchema = new Schema({
  nazwa: { type: String, required: true },
});

module.exports = mongoose.model("Rodzaj", rodzajSchema);
