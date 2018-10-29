const mongoose = require("mongoose")

const user = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    idcardNumber:String,
    // {
    //     type:String,
    //     unique:true,
    //     required:true,
    //     index:true
    // },
    avatar:
        String,
        // default: "http://pbl.yaojunrong.com/icon_default.png"
    
    password:{
        type:String,
        required:true
    },
    nickname:String,
    desc:String,
    job:Number,
    phone:String,
    sex:Number

},{versionKey:false,timestamps:{createdAt:"createdTime",updatedAt:"updateTime"}})

module.exports = mongoose.model("user",user)