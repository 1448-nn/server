const express = require("express");
const bcrypt = require ("bcryptjs");
const User = require('../models/user');

const router = express.Router();

//create account
router.post ("/user", async (req,res)=>{
    const UserData= req.body;
    try{
        const user = new User(UserData);
    await user.save();
    return res.status(201).send(user);
    } catch {
        return res.status(400).send(error);  
    }
});

//login
router.post ("/user/login", async (req,res)=>{
    const {email, password} = req.body;
    
    try{
        const user = await User.findByCredentials(email, password);
    if (!user){
    return res
    .status(404)
    .send ({error: true, message: "Unable to login, check credentials."});
}
res.status(200).send ({message: "Logged in  successfully!", user});
        
    } catch (error) {
        
        return res.status(400).send(error);  
    }
});




module.exports =router;