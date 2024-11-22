// Import Modules
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const methodOverride = require("method-override");

// Instantiate Modules
dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); // new
app.use(morgan("dev")); //new

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

app.get("/createListing/:listingID", async (req,res) => {
    const foundListing = await reListingModel.findbyId(req.params.listingID);
    res.render("show.ejs", {listingID: foundListing})
    console.log("loaded show.ejs");
})

//------------POST---------------
app.post("/createListing", async (req,res) => {

})
//------------DELETE-------------

//------------UPDATE-------------

app.listen(3008, () => {
    console.log("listening on port 3008");
})