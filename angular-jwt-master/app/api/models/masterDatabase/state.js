const mongoose = require('mongoose');
//Define a schema
mongoose.pluralize(null);
const Schema = mongoose.Schema;
const stateSchema = new Schema({
 name: {
  type: String,  
  required: true,
 },
});
module.exports = mongoose.model('state', stateSchema)