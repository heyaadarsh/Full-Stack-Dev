const express = require("express");

const app = express();

app.use(express.json());

app.post("/send-numbers", (req, res)=>{
    // nums = [1,2]
    const nums = req.body.nums;
    const len = nums.length;

    res.send("Your araay contains " + len + " numbers!");
})

// Global catches

app.use((err, req, res, next)=>{
    res.json({
        msg: "Sorry! There is something up with our server!!"
    })
})


app.listen(3000);