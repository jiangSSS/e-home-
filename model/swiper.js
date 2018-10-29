const mongoose = require("mongoose")

const swiper = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    // id:String,
    newsId:{
        type:String,
        ref:"news",
        required:true
    },
    status:Number,
    sort:Number

},{versionKey:false,timestamps:{createdAt:"createdTime",updatedAt:"updateTime"}})

module.exports = mongoose.model("swiper",swiper)