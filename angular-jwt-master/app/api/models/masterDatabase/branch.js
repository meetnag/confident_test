const mongoose = require('mongoose');
//Define a schema
mongoose.pluralize(null);
const Schema = mongoose.Schema;
const branchSchema = new Schema({
 name: {
  type: String,  
  required: true,
  unique:true,
 },
 address:{
     type:String,
     required:true,
 },
 contactName:{
     type:String,
 },
 contactNumber :{
     type:String,
 },
 country:{
     type:String,
 },
});
module.exports = mongoose.model('branch', branchSchema)