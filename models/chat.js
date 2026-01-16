const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
  from:{
   type:String,
   required:true,
  },
  to:{
    type:String,
    required:true,
  },
  msg:{
    type:String,
    maxLenght:50
  },
  create_at:{
    type:Date,
  }
});


const Chat = mongoose.model("Chat",chatSchema);

module.exports=Chat;