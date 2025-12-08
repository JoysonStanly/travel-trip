const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req,res) => {

    try {
        const {username,password,name} = req.body;

        if(!username || !password || !name) {
            return res.status(400).json({message : "Please provide all required fields"})
        }

        const existing = await User.findOne({username});

        if (existing) {
            return res.status(400).json({message : "User already exists"});
        }

        const passwordHash = await bcrypt.hash(password,10);

        const user = new User.create({username,passwordHash,name});

        const token = jwt.sign({userId : user._id,username : user.username},process.env.JWT_SECRET,{expiresIn : "7d"});
        

        res.json({token,user : {id : user._id,username : user.username,name : user.name}});
        
    } catch(error) {
        console.error("Register error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/login", async (req,res) => {

    try {

        const {username,password} = req.body;

        const user = await User.findOne({username});

        if (!user) {
            return res.status(400).json({message : "Invalid credentials"});

        }

        const isMatch = await bcrypt.compare(password,user.passwordHash);
        if (!isMatch) return res.status(400).json({message : "Invalid credentials"});

        
        const token = jwt.sign({userId : user._id,username : user.username},process.env.JWT_SECRET,{expiresIn : '7d'})

        user: { id: user._id, username: user.username, name: user.name },

    }catch(error) {
        console.error("Login error:", err.message);
    res.status(500).json({ message: "Server error" });
    }
})

module.exports = router;