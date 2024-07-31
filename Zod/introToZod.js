const express = require("express");
const z = require("zod");

const app = express();

function validate(obj){
    const schema = z.object({
        email: z.string().email(),
        password: z.string().min(8)
    })

    const response = schema.safeParse(obj);
    console.log(response);
}

validate({
    email: "hellogmail.com",
    password: "12345678"
});