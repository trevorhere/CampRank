
var express = require("express");
var router  = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//Comments New
router.get("/new", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err,campground){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("comments/new", {campground: campground});
        }
    });
});


//Comments create
router.post("/",  middleware.isLoggedIn, function(req,res){
    //lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err)
        {
            req.flash("error", "Something went wrong");
            console.log(err);
            res.redirect("/campgrounds");
        }
        else
        {
           Comment.create(req.body.comment, function(err, comment){
               if(err)
               {
                   console.log(err);
               }
               else
               {
                   // add username + id to comments
                   comment.author.id =  req.user._id;
                   comment.author.username = req.user.username;
                   comment.save();
                   // save comments
                   campground.comments.push(comment);
                   campground.save();
                   console.log(comment);
                   req.flash("sucess", "Comment added!");
                   res.redirect('/campgrounds/' + campground._id);
               }
           });
        }
    });
 
});

// edit comments
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err)
        {

            console.log(err);
            res.redirect("back");
        }
        else
        {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
}) ;

//COMMENTS UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err)
        {
            res.redirect("back");
        }
        else
        {
            res.redirect("/campgrounds/" + req.params.id );
        }
    });
    
});



// delete comments
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err)
        {
            console.log('########################');
            res.redirect("back");
        }
        req.flash("succes" ,"Comment Deleted");
        res.redirect("/campgrounds/" + req.params.id);
    })
})



module.exports = router;