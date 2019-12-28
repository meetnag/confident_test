const mongoose = require('mongoose');

let autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);

//Define a schema
const Schema = mongoose.Schema;
const productSchema = new Schema({
    productId :{
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
productSchema.plugin(autoIncrement.plugin,{model:'products',field :'productId',startAt: 1,});

module.exports = mongoose.model('products', productSchema)