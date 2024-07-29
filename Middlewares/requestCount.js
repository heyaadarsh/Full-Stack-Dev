const express = require("express");

const app = express();

let count = 0;
const requestCounter = (req, res, next) => {
    count++;
    console.log(count);
    next();
}

app.get("/", requestCounter, (req, res) => {
    res.json({
        msg:"Welcome to the server..."
    })
})


app.listen(3000);