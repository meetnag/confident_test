const mongoose = require('mongoose');
//Define a schema
mongoose.pluralize(null);
const Schema = mongoose.Schema;
const prioritySchema = new Schema({
 name: {
  type: String,  
  required: true,
  unique:true,
 },
});
module.exports = mongoose.model('priority', prioritySchema)