var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [ 
    {
        name: "Test Camground 1",
        image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg",
        description: " Description and things about other things and stuff and blah Description and things about other things and stuff and blah and blah Description and things about other things and stuff and blah and blah  Description and things about other things and stuff and blah and blah  Description and things about other things and stuff and blah and blah Description and things about other things and stuff and blah and blah Description and things about other things and stuff and blah and blah  Description and things about other things and stuff and blah and blah  Description and things about other things and stuff and blah and blah ",
        
    },
        {
        name: "Test Camground 2",
        image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
        description: "Description and things about other things and stuff and blah and blah Description and things about other things and stuff and blah and blah Description and things about other things and stuff and blah and blah  Description and things about other things and stuff and blah and blah  Description and things about other things and stuff and blah and blah Description and things about other things and stuff and blah and blah Description and things about other things and stuff and blah and blah  Description and things about other things and stuff and blah and blah  Description and things about other things and stuff and blah and blah  ",
        
    },
        {
        name: "Test Camground 3",
        image: "https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg",
        description: "Description and things about other things and stuff and blah and blah Description and things about other things and stuff and blah and blah Description and things about other things and stuff and blah and blah  Description and things about other things and stuff and blah and blah  Description and things about other things and stuff and blah and blah Description and things about other things and stuff and blah and blah Description and things about other things and stuff and blah and blah  Description and things about other things and stuff and blah and blah  Description and things about other things and stuff and blah and blah  ",
        
    }
    ];



function seedDB(){
    
    // Remove All Campgrounds
    Campground.remove({}, function(err){
        if(err)
        {
            console.log(err);
        }
        else
        {
        console.log("removed campgrounds");
            // ADD a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err,campground){
                    if(err)
                    {
                        console.log(err);
                    }
                    else
                    {
                        console.log("added a campground");
                        Comment.create({
                            text: "NIce Camp Site",
                            author: "Trevor"
                        }, function(err,comment){
                            if(err)
                            {
                                console.log(err);
                            }
                            else
                            {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("created new comment");
                            }
                        });
                    }
                });
            });
        }
    });


        // ADD coments

}

module.exports = seedDB;