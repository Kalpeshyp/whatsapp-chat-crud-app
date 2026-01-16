const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
const { create } = require("domain");
const methodOverride = require("method-override");

 app.use(methodOverride('_method'));


app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

app.use(express.static(path.join(__dirname,"public")));         //style css connection

app.use(express.urlencoded({extended:true}));

main().then(()=>{
 console.log("connection successful");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let chat1 = new Chat({
  from:"marii",
  to:"gana",
  msg:"send your photo",
  create_at:new Date()
});

// chat1.save().then((res)=>{
//   console.log(res);
// })

//Chat.deleteMany({from:"marii"});

app.get("/chats",async(req,res)=>{
  let chats = await Chat.find();
  console.log(chats);
res.render("index.ejs",{chats});
})

app.get("/chats/new",(req,res)=>{
  res.render("new.ejs");
})

app.post("/chats",(req,res)=>{
    let {from,msg,to} = req.body;
    let newChat = new Chat({
        from:from,
        msg:msg,
        to:to,
        create_at:new Date()
      })
      newChat.save()
      .then((res)=>{console.log("chat was save");
      })
        .catch((err)=>{console.log(err);
        });
        res.redirect("/chats");
})

app.get("/chats/:id/edit",async(req,res)=>{
  let{id} = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs",{chat});
})

app.put("/chats/:id", async(req,res)=>{
    let{id} = req.params;
    let{msg:newmsg} = req.body;
    let updatedmsg = await Chat.findByIdAndUpdate(id,
       {msg:newmsg},
      {runValidators:true, new:true}
    );

    console.log(updatedmsg);
    res.redirect("/chats");
})

app.delete("/chats/:id",async(req,res)=>{
  let{id} = req.params;
  let deletechat = await Chat.findByIdAndDelete(id);
  console.log(deletechat);
  res.redirect("/chats");
})

app.get("/",(req,res)=>{
  res.send("working root");
})

app.listen(8080,(req,res)=>{
  console.log("run port on 8000");
});