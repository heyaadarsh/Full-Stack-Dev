const mongoose = require('mongoose');

// connect to MongoDB
mongoose.connect('mongodb+srv://aadarsh0001:<pass>@cluster0.yvl0zfb.mongodb.net/Courses');

//Define Schemas
const AdminSchema = new mongoose.Schema({
    //Schema Defination here
    username: String,
    password: String
});

const UserSchema = new mongoose.Schema({
    //Schema Defination here
    username: String,
    password: String,
    purchasedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

const CourseSchema = new mongoose.Schema({
    //Schema Defination here
    title: String,
    description: String,
    imageLink: String,
    price: Number
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}