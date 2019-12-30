const mongoose = require('mongoose');
let autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);

//Define a schema
mongoose.pluralize(null);
const Schema = mongoose.Schema;
const spareSchema = new Schema({
    spareId :{
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
spareSchema.plugin(autoIncrement.plugin,{model:'spare',field :'spareId',startAt: 1,});

module.exports = mongoose.model('spare', spareSchema)