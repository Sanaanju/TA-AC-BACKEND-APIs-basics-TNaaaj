let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let countrySchema = new Schema({
  name: {type:String, require:true},
  states:[{type:Schema.Types.ObjectId, ref:"State"}],
  continent:String,
  population:Number,
  religions:String,
  neighbouringCountries:[{type:Schema.Types.ObjectId, ref:"Country"}],
  area:Number
});

let Country = mongoose.model("Country", countrySchema);

module.exports = Country