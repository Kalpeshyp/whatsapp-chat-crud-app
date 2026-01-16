const mongoose = require("mongoose");
const Chat = require("./models/chat.js");


main().then(()=>{
  console.log("connection successfull");
 }).catch(err => console.log(err));
 
 async function main() {
   await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
 }
 
 let allChat = [{
   from:"gana",
   to:"gana",
   msg:"send your photo",
   create_at:new Date()
 },
 {
  from:"raju",
   to:"gaju",
   msg:"send your photo",
   create_at:new Date()
 },
 {
  from:"mumesh",
   to:"akshay",
   msg:"send your photo",
   create_at:new Date()
 },
 {
  from:"nikhil",
   to:"karan",
   msg:"send your photo",
   create_at:new Date()
 },
 {
  from:"gopal",
   to:"gaurav",
   msg:"send your photo",
   create_at:new Date()
 },
];

Chat.insertMany(allChat)