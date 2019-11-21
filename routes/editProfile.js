const express = require("express");
const User = require("../models/User");
const axios = require("axios")
const router = express.Router();
router.get("/edit", (req, res, next) => {
  //res.send(req.user)
  User.findById(req.user._id).then(match => {
    const selectedCat = match.category;
    // const sources = getTopHeadlines().then(response => {
    // const otherSources = response.sources.map(x => x.name).filter(x => !selectedSources.includes(x)).slice(0, 10)
    res.render("editProfile", { user: req.user, categories: selectedCat })
    // })
  })
})
//DELETING SOURCES
router.post("/edit/removeTag", (req, res, next) => {
  User.findByIdAndUpdate(req.user.id, {
    $pull: {
      category: req.body.categories
    }
  }, {
    new: true
  })
    .then(result => {
      res.json(result)
      return res.redirect('/edit')
    })
    .catch(err => console.log(err))
})
//ADD ELEMENTS
router.post("/edit/addTag", (req, res, next) => {
  if (!req.user) return res.redirect('/')
  User.findByIdAndUpdate(req.user.id, {
    $push: {
      category: req.body.categories
    }
  }, {
    new: true
  })
    .then(result => {
      res.json(result)
      return res.redirect('/edit')
    })
    .catch(err => console.log(err))
})
module.exports = router;