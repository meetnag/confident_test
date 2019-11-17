const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const UserLoggedSchema = new Schema({
 userEmail: {
  type: String
 },
 deviceId: {
  type: String
 },
 loggedInTime:{
     type:Date
 }

});
module.exports = mongoose.model('UserLogged', UserLoggedSchema)