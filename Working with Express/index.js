const express = require('express');
const { is } = require('express/lib/request');

const app = express();


// req & res : request & response

// Request methods
// 1. GET - Going for a consultation to get a check up. (Asking something from the server )
// 2. POST - Going to get a new kidney inserted.
// 3. PUT - Going to get a kindney replaced.
// 4. DELETE - Going to get a kidney removed.

// Status Codes
// 1. 200 - Everything went fine.
// 2. 404 - Doctor is not in the hospital.
// 3. 500 - Mid surgery light went away.
// 4. 411 - Inputs were incorrect, wrong person came to surgery.
// 5. 403 - You are not allowed in the hospital.

// Hospital Express Server Assignment
// We need to create 4 routes (4 things that the hospital can do!)
// 1. GET - User can check how many kidneys they have and their health.
// 2. POST - User can add a new kidney
// 3. PUT - User can replace a kidney make it healthy.
// 4. User can remove a kidney


// Creating a data model
const users = [{
    name: "agyat",
    kidneys: [{
        healthy: false
    }]
}];

app.get("/", (req, res) => {
    // Logic to show total kidneys and their health status.
    const johnKidneys = users[0].kidneys;
    const totalNumberOfKidneys = johnKidneys.length;
    let healthyKidneys = 0;
    for(let i = 0; i<johnKidneys.length; i++){
        if(johnKidneys[i].healthy==true){
            healthyKidneys++;
        }
    }

    const unhealthyKidneys = totalNumberOfKidneys - healthyKidneys;

    res.send({
        totalNumberOfKidneys,
        healthyKidneys,
        unhealthyKidneys
    })
})

app.use(express.json()); //middleware

app.post("/", (req, res)=>{
    // Adding a new kidney
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    })

    res.json({
        msg: "Kidney Added Sucessfully!"
    })
})

app.put("/", (req, res)=>{
    // Replace all the unhealthy kindneys with the healthy ones!
    for(let i = 0; i<users[0].kidneys.length; i++){
        users[0].kidneys[i].healthy = true;
    }

    res.json({
        msg: "All Unhealthy Kindneys have replaced sucessfully!"
    })
})

app.delete("/", (req, res)=>{
    // Logic to delete all unhealthy kidneys

    const newKidneys = [];

    for(let i = 0; i<users[0].kidneys.length; i++){
        if(users[0].kidneys[i].healthy==true){
            newKidneys.push({
                healthy: true
            })
        }
    }
    users[0].kidneys = newKidneys;

    res.json({
        msg: "All unhealthy kindneys are removed!"
    })
})


app.listen(3000);