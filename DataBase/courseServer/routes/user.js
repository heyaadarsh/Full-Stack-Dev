const {Router} = require("express");
const userMiddleware = require("../middlewares/user");
const router = Router();
const {User, Course} = require("../DB/index")

// User Routes
router.post('/signup', (req, res)=>{
    // Implement user signup logic

    const username = req.body.username;
    const password = req.body.password;

    User.create({
        username,
        password
    })
    .then(function(){
        res.json({
            msg: "User Created Successfully!"
        })
    })
    .catch(function(){
        res.json({
            msg: "Error! User not created!!"
        })
    })
});

router.get('/courses', (req, res)=>{
    // Implement listing all courses logic

    Course.find({})
    .then((val)=>{
        res.json({
            courses: val
        })
    })
});

router.post('/courses/:courseId', userMiddleware, (req, res)=>{
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;

    User.updateOne({
        username: username
    },{
            "$push": {
                purchasedCourses: courseId
            }
    })
    .then(()=>{
        res.json({
            msg: "Course Purchased Successfully!"
        })
    })
    .catch((e)=>{
        res.json({
            error: e
        })
    })
})

router.get('/purchasedCourses', userMiddleware, async (req, res)=>{
    // Implement fetching purchased course logic

    const user = await User.findOne({
        username: req.headers.username
    })
    
    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourses
        }
    })

    res.json({
        courses: courses
    })

});

module.exports = router;