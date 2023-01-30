const express=  require('express');
const router =express.Router();
// const User = require('../../model/user.model')
const passport =  require('../../middleware/passport');

router.get('/',(req,res)=>{
    res.render('index');
})

router.get('/profile', async(req,res)=>{
  const user =req.user.user
  //console.log(user)
  res.render('user/home',{user});
})


module.exports = router;