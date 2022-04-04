let express = require("express");
let router = express.Router();
let Country = require("../models/Country");
let State = require("../models/State");

// listing states in descending order by population
router.get("/sort/descending", (req,res,next) => {
  State.find({}).populate("country").populate("neighbouring_states").sort({'population': -1}).exec((err, countries) => {
    if(err) return res.json(err);
    res.status(200).json({countries});
  });
});

// listing states in ascending order by population
router.get("/sort/ascending", (req,res,next) => {
  State.find({}).populate("country").populate("neighbouring_states").sort({'population': 1}).exec((err, countries) => {
    if(err) return res.json(err);
    res.status(200).json({countries});
  });
});

// Listing neighbouring_states of perticular state
router.get("/id", (req,res,next) => {
  State.findById(req.params.id).populate("neighbouring_states").populate("country").exec((err,state) => {
    if(err) return res.json(err);
    res.status(200).json({state});
  });
});

// Update perticular state
router.put("/:id", (req,res,next) => {
  State.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, state) => {
    if(err) return res.json(err);
    res.status(200).json({state});
  });
});

// Delete perticular state
router.delete("/:id", async(req,res,next) => {
  try{
    let state = await State.findByIdAndDelete(req.params.id);
    let country = await Country.findByIdAndUpdate(state.Country, { $pull: { states: state.id}}, {new:true});  
    res.status(200).json({country,state});
  } catch (e) {
    if(err) return res.json(err);
    res.status(400).json(e);
  }
});

module.exports = router;
