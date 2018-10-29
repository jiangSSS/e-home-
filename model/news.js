const mongoose = require("mongoose")

const news = new mongoose.Schema({
    title:String,
    content:String,
    contentText:String,
    img:String,
    author:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"user"
    },
    category:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"category"
    },
    lookNum:{
        type:Number,
        default:233
    },

},{versionKey:false,timestamps:{createdAt:"createdTime",updatedAt:"updateTime"}})

module.exports = mongoose.model("news",news)