const { OAuth2Client } = require('google-auth-library');
const { googleClientId } = require('../config')

const client = new OAuth2Client(googleClientId);

const googleAuth = async (req, res, next, tokenVal) => {
    
    try {  
        const token = req.headers["authorization"] || tokenVal;
    
        if (!token) {
            return res.status(403).send('A token is required for authorization');
        };
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: googleClientId,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
      
        const payload = ticket.getPayload();
        req.user= payload;
        next();
    }
    catch (err) {
        // return res.status(401).send("Invalid Token");
        console.log('google auth',err);
        return
    }

}

module.exports =googleAuth
