const express = require('express');
const router= express.Router();

const {usersRoutes} = require('./src/users') 
const  basicRoute = require('./src/users/basic.router')
const {tasksRoutes} =  require('./src/userTask')


router.use('/',basicRoute);
router.use('/auth',usersRoutes);
router.use('/task',tasksRoutes);

module.exports = router




