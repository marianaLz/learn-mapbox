const express = require('express');
const router  = express.Router();
const Place = require('../models/Place')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/map', (req, res, next) => {
  Place.find().then( places => {
    console.log(places)
    res.render('map', {places});
  })
});

router.get("/new", (req, res) => {
  res.render("new");
});

router.post("/new", (req, res) => {
  let { lng, lat, name, address } = req.body;
  let place = {
    name,
    address,
    location: {
      type: "Point",
      coordinates: [lng, lat]
    }
  };
  Place.create(place).then(() => {
    res.redirect("/map");
  });
});

module.exports = router;
