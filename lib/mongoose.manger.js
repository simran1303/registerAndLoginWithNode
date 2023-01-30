const mongoose = require('mongoose');
const {mongoUrl} = require('../config');


const connectDb = async()=>{
    try{
        const conn = mongoose.connect(mongoUrl, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        console.log('Mongodb Connected')
    }
    catch(err){
     console.log(err);
    }
}

module.exports = {connectDb}