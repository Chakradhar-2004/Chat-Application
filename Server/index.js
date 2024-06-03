const express = require("express")
const mongoose  = require("./connection")
const cors  = require("cors")
const userRoute = require("./Routers/userRoute")
const messageRoute = require("./Routers/messageRoute")
const PORT = 80;
const app = express()
app.use(cors(),(req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });
app.use(express.json())
app.use("/api/auth", userRoute)
app.use("/api/messages",messageRoute)
const server = app.listen(PORT, ()=>{
    console.log(`app listing on PORT ${PORT}`)
})