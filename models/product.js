var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, require: true },
  furnitureCollection: { type: String, require: true },
  material: { type: String, require: true },
  room: { type: String, require: true },
  filename: { type: String, require: true },
  date: { type: Date, default: Date.now },
  price: { type: Number, require: true },
});

module.exports = mongoose.model("Product", productSchema);
