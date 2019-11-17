const mongoose = require('mongoose');

mongoose.pluralize(null);
//Define a schema
const Schema = mongoose.Schema;
const ocDocumentSchema = new Schema({
 ocid: {
  type: String,
  required: true
 },
 documentname: {
  type: String
 },
uploadedby:{
    type:String,
},
uploadeddate :{
    type: Date,
},
filePath:{
    type:String,
},
notes:{
    type:String,
},
srNo:{
    type:Number,
}

});

module.exports = mongoose.model('ocDocument', ocDocumentSchema);