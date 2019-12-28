const mongoose = require('mongoose');

let autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);
//Define a schema
mongoose.pluralize(null);
const Schema = mongoose.Schema;
const subAssemblySchema = new Schema({
    subAssemblyId :{
        type:Number,
        required : true ,
        unique:true ,
    }, 
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
subAssemblySchema.plugin(autoIncrement.plugin,{model:'subAssembly',field :'subAssemblyId',startAt: 1111,});

module.exports = mongoose.model('subAssembly', subAssemblySchema)