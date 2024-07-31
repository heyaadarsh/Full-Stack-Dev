const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const jwtPassword = "supremeYaskin";

const userArray = [
    {
        username: "hiaadarsh",
        password: "dishaPatani"
    },
    {
        username: "mishra",
        password: "noraFatehi"
    },
    {
        username: "gurjar",
        password: "chauhan"
    }
];

const userExists = (username, password) => {
    let userExist = false;

    for(let i = 0; i<userArray.length; i++){
        if(userArray[i].username==username && userArray[i].password==password){
            userExist = true;
        }
    }

    return userExist;
}

app.post("/login", (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;

    if(!userExists(username, password)){
        return res.status(403).json({
            msg: "User doesn't exist in our DataBase!!"
        })
    }

    let token = jwt.sign({username: username}, jwtPassword);

    return res.json({
        token
    });

})

app.get("/users", (req, res)=>{
    const token = req.headers.authorization;

    try{
        const decoded = jwt.verify(token, jwtPassword);
        const username = decoded.username;
        
        return res.json({
            users: userArray
        });

    }
    catch (err){
        return res.status(403).json({
            msg: "Invalid Token!"
        });
    }
})

app.listen(3000);