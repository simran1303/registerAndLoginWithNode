const auth = require('./auth');
const googleAuth = require('./googleAuth');
const {upload}  = require('./imageUplod')
const authenticate = async (req, res, next) => {
    let tokenVal;
    try {
        if (req.cookies.googleToken) {
            tokenVal = req.cookies.googleToken;
            googleAuth(req, res, next, tokenVal);
        }
        else{
            tokenVal = req.cookies.token.auth;
            auth(req, res, next, tokenVal);
            // upload
            // console.log('...',upload)
        }
    } catch (err) {
    //     console.log('main ..',err)
    //   throw new Error(err);
    console.log(err);
    res.sendStatus(500);
    return;
    }
}

module.exports =authenticate;