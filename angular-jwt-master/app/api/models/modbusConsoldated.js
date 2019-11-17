const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const modbusConsolidatedSchema = new Schema({
    seqNumber:{
        type:Number,
        unique:true,
    },
    lotNo: {
     type: Number,
     trim: true,  
     required: true,
    },
    HMINo: {
        type:Number
    },
    colorSeq :{
        type: String
    },
    quantity :{
        type : Number
    },
    timeDuration :{
        type :Number
    },
    startTime:{
        type:Number
    },
    endTime :{
        type:Number
    }
   });

module.exports = mongoose.model('modbusConsolidated', modbusConsolidatedSchema)