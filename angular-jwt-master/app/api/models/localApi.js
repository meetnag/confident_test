const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const localApi = new Schema({
    status:{
        type:Number
    },
    duration:{
        type:Number
    },
    system:{
        type:Number
    }
   });

module.exports = mongoose.model('localModbus', localApi)