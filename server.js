// Import Modules
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const methodOverride = require("method-override");
const path = require("path");

// Instantiate Modules
dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); // new
app.use(morgan("dev")); //new


app.use(express.static(path.join(__dirname, "public")));
mongoose.connect(process.env.MONGODB_URI); // Connect to MongoDB
mongoose.connection.on("connected", () => { //Log connection
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });

//import model
const reListingModel = require("./Models/reListingModel.js");
//------------GET----------------
app.get ("/", async (req,res) => {
    res.render("index.ejs");
    console.log("loaded index.ejs");
})

app.get ("/createListing", async (req,res) => {
    res.render("reListings/createListings.ejs");
    console.log("loaded createListings.ejs");
})
app.get ("/allListings", async (req,res) => {
    const allListings = await reListingModel.find();
    res.render("reListings/allListings.ejs", {listings: allListings})
    console.log("loaded allListings");
    
})
app.get("/allListings/:listing", async (req,res) => {
    const foundListing = await reListingModel.findById(req.params.listing);
    res.render("reListings/show.ejs", {listing: foundListing})
    // res.render(`show.ejs, ${req.params.listing}`)
    console.log("loaded show.ejs");
})

app.get("/allListings/:listing/edit", async (req,res) => {
    const listing = await reListingModel.findById(req.params.listing)
    res.render("reListings/editListing.ejs", { listing });
})
//------------POST---------------
app.post("/createListing", async (req,res) => {
    const listingCreated = await reListingModel.create(req.body);
    res.redirect("/allListings")
    console.log("Request Body:", req.body);
    console.log("created Listing");
    
})
//------------DELETE-------------
app.delete("/allListings/:listing", async (req,res) => {
    await reListingModel.findByIdAndDelete(req.params.listing);
    res.redirect("/allListings");
    console.log("Listing Deleted");
});
//------------UPDATE-------------

app.put("/allListings/:listing", async (req,res) => {
    await reListingModel.findByIdAndUpdate(req.params.listing, req.body);
    res.redirect(`/allListings/${req.params.listing}`);
})




//Listener
app.listen(3008, () => {
    console.log("listening on port 3008");
})