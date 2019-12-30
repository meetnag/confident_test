const mongoose = require('mongoose');
//Define a schema
mongoose.pluralize(null);
const Schema = mongoose.Schema;
const customerSchema = new Schema({
 name: {
  type: String,  
 },
 address:{
     type:String,
 },
 city:{
     type:String,
 },
 contactNumber :{
     type:String,
 },
 CustEmailID:{
     type:String,
 },
 state:{
     type:String,
 },
 zip:{
     type:Number,
 },
 landlineNumber:{
    type:String ,
},
 country:{
     type:String,
 },
});
module.exports = mongoose.model('customer', customerSchema)