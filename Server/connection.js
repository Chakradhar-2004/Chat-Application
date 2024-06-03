const mongoose = require("mongoose")
const URL =  "mongodb+srv://chakradhar:12345@cluster0.x69omla.mongodb.net/Chat?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(URL)
.then(()=>{
    console.log("Connected to MongoDB")
}).catch(err =>{
    console.log(err.message)
})
module.exports = mongoose
 