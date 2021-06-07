var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const newsletterSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, require: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Newsletter", newsletterSchema);
