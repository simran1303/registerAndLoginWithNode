const jwt = require('jsonwebtoken');
const {tokenKey} = require('../config');
const User = require('../model/user.model')

const verifyToken = async (req, res, next ,tokenVal) => {
    const token = req.headers["authorization"] || tokenVal;
   
    if (!token) {
        return res.status(403).send('A token is required for authorization');
    };

    try {
        const decode = jwt.verify(token, tokenKey);
        req.user = decode;
        req.token = token; 
         next();
    } catch (error) {
        return res.status(401).send("Invalid Token");
    }
};

module.exports = verifyToken;