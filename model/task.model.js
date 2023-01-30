const mongoose = require('mongoose');
const AutoIncrementFactory = require('mongoose-sequence');
const AutoIncrement = AutoIncrementFactory(mongoose);

const Schema = mongoose.Schema;
const taskModel = new Schema({
    taskId:{
        type:Number,
        require:true,
        unique:true
    },
    userEmail:{
        type: String, 
        require:true, 
    },
    taskDetail:{
        type:String,
    },
    taskStatus:{
        type:String,
        enum:['Complete','In Progress','Not Started'],
        default:'Not Started',
        require:true
    }
    
})

taskModel.plugin(AutoIncrement, { inc_field: 'taskId' });

module.exports = mongoose.model('userTask',taskModel);