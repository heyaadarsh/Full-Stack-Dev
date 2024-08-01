const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://aadarsh0001:@cluster0.yvl0zfb.mongodb.net/newUserApp");

const User = mongoose.model('users', {
    name: String,
    email: String,
    password: String
});

const user = new User({
    name: "Agyat",
    email: "xyz@gmail.com",
    password: "dishaPatani"
})

user.save()