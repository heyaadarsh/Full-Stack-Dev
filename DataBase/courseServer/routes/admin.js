const {Router} = require("express");
const adminMiddleware = require("../middlewares/admin");
const router = Router();
const {Admin} = require("../DB/index");
const {Course} = require("../DB/index")

// Admin Routes
router.post('/signup', (req, res)=>{
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    Admin.create({
        username: username,
        password: password
    })
    .then(function(){
        res.json({
            msg: "Admin Created Successfully!"
        })
    })
    .catch(function(){
        res.json({
            msg: "Error! Admin not created!!"
        })
    })
});

router.post('/courses', adminMiddleware, (req, res)=>{
    // Implement Course Creation Logic

    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;

    const newCourse = Course.create({
        title,
        description,
        imageLink,
        price
    })
    .then(function(){
        res.json({
            msg: "Course Added SuccessFully",
            courseId: newCourse._id
        })
    })
    .catch(function(){
        res.json({
            msg: "Course creation failed!!"
        })
    })

    
});

router.get('/courses', adminMiddleware, (req, res)=>{
    // Implement fetching all courses logic

    Course.find({

    })
    .then((val)=>{
        res.json({
            Courses: val
        })
    })
})

module.exports = router;