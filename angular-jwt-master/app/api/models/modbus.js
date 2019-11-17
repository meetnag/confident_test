const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const modbusSchema = new Schema({
 test: {
  type: String,
  trim: true,  
  required: true,
 },
 HMINo:{
     type:Number
 }
});

module.exports = mongoose.model('modbus', modbusSchema)