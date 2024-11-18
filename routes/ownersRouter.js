const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model')


// console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV === "development"){ // check this route through postman
    router.post('/create', async (req, res) => {
        let owners = await ownerModel.find(); 
        console.log(owners.length)
        if(owners.length > 0){
            return res.status(500).send("you don't have a permission to create a new owner yet!")
            // console.log(owners)
        }

        let {fullname, email, password} = req.body;
        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password
        });

        res.status(201).send(createdOwner);
    });
}

router.get('/', (req, res) => {
    res.send("hey, ownerRouting is working");
});

module.exports = router;