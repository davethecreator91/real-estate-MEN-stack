const mongoose = require("mongoose");

const reLisitngSchema = new mongoose.Schema({
    address: String,
    desc: String,
    price: Number,
    bed: Number,
    bath: Number,
    sqft: Number,
})

const reListingModel = mongoose.model("reListingModel", reLisitngSchema);
module.exports = reListingModel;