const userModel = require('../models/user-model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {generateToken} = require('../utils/generateToken')

module.exports.registerUser = async (req, res) => {
    try {
        let { fullname, email, password } = req.body;

        let userExists = await userModel.findOne({ email });
        if(userExists) return res.status(401).send("You already have an accout! Please login.")

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.send(err.message);
                else {
                    const user = await userModel.create({
                        fullname,
                        email,
                        password: hash 
                    });
 
                    let token = generateToken(user)
                    res.cookie("token", token);
                    res.send("user created successfully")
                }
            })
        })



    } catch (error) {
        res.send(error.message);
    }
}