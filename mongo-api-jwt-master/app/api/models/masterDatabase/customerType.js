const mongoose = require('mongoose');
//Define a schema
mongoose.pluralize(null);
const Schema = mongoose.Schema;
const customerTypeSchema = new Schema({
 name: {
  type: String,  
  required: true,
  unique:true,
 },
});
module.exports = mongoose.model('customerType', customerTypeSchema)