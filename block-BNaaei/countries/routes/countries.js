let express = require("express");
let router = express.Router();
let Country = require("../models/Country");
let State = require("../models/State");


// fetching countries based on query
router.get("/", async(req,res,next) => {
    Country.find(req.query).populate("states").populate("neighbouringCountries").exec((err,countries) => {
      if(err) return res.json({err});
      res.status(200).json({countries});
    });
});

// listing countries in descending order by population
router.get("/sort/descending", (req,res,next) => {

  Country.find({}).sort({'population': -1}).exec((err, countries) => {
    if(err) return res.json({err});
    res.status(200).json({countries});
  });
});

// listing countries in ascending order by population
router.get("/sort/ascending", (req,res,next) => {
  Country.find({}).sort({'population': 1}).exec((err, countries) => {
    if(err) return res.json({err});
    res.status(200).json({countries});
  });
});

// fetching all religions in country data set
router.get("/religions/all", async(req,res,next) => {
  try{
    let country = await Country.distinct("religions"); 
    console.log(country);
    res.status(200).json({country});
  } catch (e) {
    res.status(400).json({e});
  }
});

// Create new country
router.post("/new", (req,res,next) => {
  req.body.neighbouringCountrie = ["6225e0f7c85462a22d380ea3", "6225e1efc04b2249c6efca4a"]
  Country.create(req.body, (err, country) => {
    if(err) return res.json({err});
    res.status(200).json({country});
  });
});

// Listing neighbouring_countries of perticular country
router.get("/:id", (req,res,next) => {
  console.log(111)
  Country.findById(req.params.id).populate("states").populate("neighbouringCountries").exec((err,country) => {
    if(err) return res.json({err});
    res.status(200).json({country});
  });
});

// Create new State
router.post("/:id/state", async(req,res,next) => {
  req.body.country = req.params.id;
  try{
    let state = await State.create(req.body);
    let country = await Country.findByIdAndUpdate(req.params.id, { $push: { states: state.id}}, {new:true});
    res.status(200).json({country, state});
  } catch (e) {
    res.status(400).json({e});
  }
});

// Update perticular country
router.put("/:id", async(req,res,next) => {
  Country.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, country) => {
     if(err) return res.json({err});
     res.status(200).json({country});
  });
}); 

// Delete perticular country
router.delete("/:id", (req,res,next) => {
  Country.findByIdAndDelete(req.params.id, (err, country) => {
     if(err) return res.json({err});
     res.status(200).json({country});
  });
}); 

module.exports = router;
