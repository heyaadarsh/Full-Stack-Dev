const { error } = require("console");
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://aadarsh0001:@cluster0.yvl0zfb.mongodb.net/newUserApp")
    .then(()=>{
        console.log("Connected to DB Sucessfully!");        
    })
    .catch((error)=>{
        console.error("Error connecting to DB", error);
    })

const User = mongoose.model('users', {
    name: String,
    email: String,
    password: String
});

app.post("/signup", async (req, res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const existingUser = await User.findOne({email: email});

    if(existingUser){
        return res.status(400).send("User with the same email already exists");
    }

    const user = new User({
        name: name,
        email: email,
        password: password
    });

    await user.save();
    res.json({
        msg: "User added sucessfully!"
    })
})


app.listen(3000);