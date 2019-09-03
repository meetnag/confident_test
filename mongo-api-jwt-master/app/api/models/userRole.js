const mongoose = require('mongoose');

mongoose.pluralize(null);
//Define a schema
const Schema = mongoose.Schema;
const UserRoleSchema = new Schema({
 RoleName: {
  type: String,
  trim: true,  
  unique:true,
  required: true,
 }
});
module.exports = mongoose.model('userRole', UserRoleSchema);
