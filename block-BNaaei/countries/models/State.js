let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let stateSchema = new Schema({
  stateName: {type:String, require:true},
  country:{type:Schema.Types.ObjectId, ref:"Country"},
  population:Number,
  neighbouring_states:[{type:Schema.Types.ObjectId, ref:"State"}],
  area:Number
});

let State = mongoose.model("State", stateSchema);

module.exports = State;