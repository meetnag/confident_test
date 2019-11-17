const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const rawMaterialSchema = new Schema({
 operatorId: {
  type: String,
  required: true,
 },
 rawMaterialA:{
    type:Number,
 },
 rawMaterialB:{
    type:Number,
 },
  rawMaterialC:{
    type:Number,
 },
 startTime:{
     type:Date,
 },
 stopTime:{
     type:Date,
 },
 status:{
     type:Number,
 },
 is_active:{
     type:Boolean,
 }
 
});

module.exports = mongoose.model('rawMaterial', rawMaterialSchema)