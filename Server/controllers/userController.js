const Users = require("../Models/userModel");
//const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        const usernameCheck = await Users.findOne({ username: username });
        if (usernameCheck) {
            return res.json({ msg: "Username already exists", status: false });
        }
        const emailCheck = await Users.findOne({ email: email });
        if (emailCheck) {
            return res.json({ msg: "Email already exists", status: false });
        }
        
        const user = await Users.create({
            username,
            email,
            password
        });
        return res.json({ status: true, user });
    } catch (err) {
        next(err);
    }
};

module.exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await Users.findOne({ email: email });
        if (!user) {
            return res.status(401).json({ msg: "Invalid email or password" });
        }

        if (!user.password) {
            return res.status(400).json({ msg: "User password is not set" });
        }

        const vaildPassword = user.password
        if (vaildPassword !== password) {
            console.log({ msg: "Invalid email or password" });
        }
        else{
        console.log("Logged Successfully")
        return res.json({ status: true, user })
        }
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ msg: "Internal server error" });
    }
    
};

module.exports.setAvatar = async(req,res,next)=>{
    
    try {
        const userId = req.params.id
        const avatar = req.body.image
        const userData = await Users.findByIdAndUpdate(userId,{
            avatar
        })
        return res.json({
            image: userData.avatar
        })
        
    } catch (error) {
        next(error)
    }
}

module.exports.getAllUsers = async (req,res,next) => {
    try {
        const users = await Users.find({_id: {$ne: req.params.id}}).select([
            "username",
            "email",
            "avatar",
            "_id"
        ]) 
        return res.json(users)
    } catch (error) {
        
    }
}