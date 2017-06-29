var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// INDEX - show all campgrounds
router.get("/", function(req,res){
  // Get all campgrounds from DB
  Campground.find({},function(err,allCampgrounds){
      if(err){
          console.log(err);
      } else {
        res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});

      }
  });
});

//Create campground
router.post("/", middleware.isLoggedIn, function(req,res){
   // res.send("You hit the post route");
    //get data from form and add to campground array
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var description = req.body.description;
    var author = 
    {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, price: price, image: image, description: description, author:author};

   // Create a new campground and save to DB
   Campground.create(newCampground, function(err, newlyCreated){
       if(err){
           console.log(err);
       } else {
         //redirect back to campground page
         console.log(newlyCreated);
         res.redirect("/campgrounds");
       }
   });
});

//New show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req,res){
    res.render("campgrounds/new");
});

// SHOW  - shows more info about a single campground
router.get("/:id", function(req,res){
    //find the campground with provide ID
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err)
        {
            console.log(err);
        }
        else 
        {
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// Edit campground route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
     Campground.findById(req.params.id, function(err,foundCampground){
                      res.render("campgrounds/edit", {campground: foundCampground});
        });
});

//UPdate route
router.put("/:id", middleware.checkCampgroundOwnership ,function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err)
        {
             console.log("Big error");
             console.log(err);
            res.redirect("/campgrounds");
            
        }
        else
        {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
    
});

// Delete Route
router.delete("/:id", middleware.checkCampgroundOwnership ,function(req,res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err)
        {
            res.redirect("/campgrounds");
        }
        
        res.redirect("/campgrounds");
    })
})


module.exports = router;