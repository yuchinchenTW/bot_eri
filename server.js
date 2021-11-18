const express = require("express");

const server = express();

server.all("/",(req,res)=>{
  res.send("bot is running")


})

function keepAlive(){
  server.listen(4000,()=>{
    console.log("running")
  })


}


module.exports=keepAlive;