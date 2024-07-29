const express = require('express');

const app = express();

function calculateSum(n){
    let sum = 0;

    for(let i = 0; i<=n; i++){
        sum += i;
    }

    return sum;
}

app.get('/', (req, res)=>{
    let n = req.query.n;
    let sum = calculateSum(n);
    res.send(sum.toString());
})

app.listen(3000);