var express = require("express");
var app = express();
app.set("view engine","ejs");
app.use(express.static("public"));

var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended : true}));

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_app",{useNewUrlParser: true});

var methodOverride = require("method-override");
app.use(methodOverride("_method"));

var expressSanitizer= require("express-sanitizer");
app.use(expressSanitizer());

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog",blogSchema);


// Blog.create({
//     title:"test blog",
//     image:"data:image/jpeg;base64,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",
//     body: "This is a very cute teddy bear. I love him."
// })

app.get("/",function(req,res){
    res.redirect("/blogs");
})

app.get("/blogs",function(req,res){
    Blog.find({},function(err,blogs){
        if(err)
            console.log(err);
        else{
            res.render("index",{blogs:blogs});
        }
    })
})

app.get("/blogs/new",function(req,res){
    res.render("new");
})

app.post("/blogs",function(req,res){
    
    //console.log(req.body);
    req.body.body= req.sanitize(req.body.body);
    // console.log("=======");
    //console.log(req.body);
    var newTitle = req.body.title;
    var newImage = req.body.image;
    var newBody = req.body.body;
    var newDate = Date.now();
    
    var obj = { 
        title: newTitle,
        image: newImage,
        body: newBody,
        created: newDate
    }
    
     Blog.create(obj,function(err,obj){
        if(err)
            console.log(err);
        else{
           res.redirect("/blogs");
        }
    })
})

app.get("/blogs/:id",function(req,res){
    Blog.findById(req.params.id,function(err,blog){
        if(err)
            res.redirect("/blogs");
        else{
            res.render("show",{blog:blog});
        }
    })
})

app.get("/blogs/:id/edit",function(req,res){
    Blog.findById(req.params.id,function(err,blog){
        if(err)
            res.redirect("/blogs");
        else{
            res.render("edit",{blog:blog});
        }
    })
})

app.put("/blogs/:id",function(req,res){
   // res.send("update");
   req.body.body= req.sanitize(req.body.body);
    var newTitle = req.body.title;
    var newImage = req.body.image;
    var newBody = req.body.body;
    var newDate = Date.now();
    
    var obj = { 
        title: newTitle,
        image: newImage,
        body: newBody,
        created: newDate
    }
    
     Blog.findByIdAndUpdate(req.params.id,obj,function(err,obj){
        if(err)
            console.log(err);
        else{
           //res.redirect("/blogs");
           console.log("update");
           res.redirect("/blogs/"+req.params.id);
        }
    })
})

app.delete("/blogs/:id",function(req,res){
    Blog.findByIdAndRemove(req.params.id,function(err){
        if(err)
            res.redirect("/blogs");
        else
            res.redirect("/blogs");
    })
})
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("server listening");
})
