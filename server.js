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


//------------GET----------------
app.get ("/", async (req,res) => {
    res.render("index.ejs");
    console.log("loaded index.ejs");
})

app.get ("/createListing", async (req,res) => {
    res.render("index.ejs");
    console.log("loaded index.ejs");
})

app.get("/createListing/:listing", async (req,res) => {
    res.render("RElistings/show.ejs")
    console.log("loaded show.ejs");
})

//------------POST---------------

//------------DELETE-------------

//------------UPDATE-------------

