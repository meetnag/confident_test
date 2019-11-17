const mongoose = require('mongoose');
//Define a schema
mongoose.pluralize(null);
const Schema = mongoose.Schema;
const subAssemblySchema = new Schema({
    code:{
        type:String,
        required :true,
        unique:true,
    },
 name: {
  type: String,  
  required: true,
 },
});
module.exports = mongoose.model('subAssembly', subAssemblySchema)