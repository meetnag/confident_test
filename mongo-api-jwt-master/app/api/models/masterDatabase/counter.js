const mongoose = require('mongoose');
//Define a schema
mongoose.pluralize(null);
const Schema = mongoose.Schema;
const counterSchema = new Schema({
 sequence_value: {
  type: Number
 },
});
module.exports = mongoose.model('counter', counterSchema)