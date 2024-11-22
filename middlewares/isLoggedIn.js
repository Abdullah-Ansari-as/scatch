const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

module.exports = async (req, res, next) => {
    if(!req.cookies.token){
        req.flash('error', 'You need to login first!!!!')
        return res.redirect('/');
    }

    try {
        let data = jwt.verify(req.cookies.token, process.env.JWT_KEY); 
        let user = await userModel.findOne({email: data.email}).select("-password");
        req.user = data;

        next();
    } catch (error) {
        req.flash('error', 'somethig went wrong!')
        return res.redirect('/');
    }
};