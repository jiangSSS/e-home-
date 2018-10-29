const mongoose = require("mongoose")

const category = new mongoose.Schema({
    title:String,
    // icon:String

},{versionKey:false,timestamps:{createdAt:"createdTime",updatedAt:"updateTime"}})

module.exports = mongoose.model("category",category)