var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const materialSchema = new Schema({
  
  name: { 
    type: String, 
    required: true 
  },
  date: { 
    type: Date, 
    default: Date.now 
  },
});

module.exports = mongoose.model("Material", materialSchema);
