const express = require('express');
const router = express.Router();
const passport = require('passport')

const userController = require('./user.controller');
const authenticate = require('../../middleware/resultAuth');
const {upload} = require('../../middleware/imageUplod');


router.get('/register',userController.userGetRegister);
router.post('/register',upload,userController.userRegister);

router.get('/',userController.userGetLogin);
router.post('/login', userController.userLogin);

router.get('/user', authenticate , userController.getUser);

router.get('/update',userController.userGetUpdate);
router.post('/update',authenticate, userController.userUpdate);

// async(req,res,next)=>{
//   await authenticate(req,res,next);
//   console.log('hiiii');
//   await upload;
//   console.log('hello')
//   next()
//   }

router.get('/logout', authenticate, userController.userLogout);


router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    const token = req.user.token
    res.cookie("googleToken",token,{
      httpOnly: true
    })
    res.redirect('/profile');
  });

  router.get('/reset',userController.getPasswordReset); 
 router.post('/reset',userController.passwordReset); 
 
 router.get('/reset/:token',userController.getNewPassword);
 router.post('/new-password',userController.newPassword);


module.exports = router