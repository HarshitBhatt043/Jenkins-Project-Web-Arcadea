const express=require("express"),path=require("path"),opn=require("opn"),server=express(),host="http://localhost:8082";server.use("/assets",express.static(path.resolve(__dirname,"./assets"))),server.use("/dist",express.static(path.resolve(__dirname,"./dist"))),server.get("*",((e,s)=>{s.sendFile(path.resolve(__dirname,"./index.html"))})),server.listen(8082,(()=>{opn(host)}));