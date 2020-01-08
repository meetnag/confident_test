const mongoose = require('mongoose');
let autoIncrement = require('mongoose-auto-increment');

// global.mongoose = require('./config/database'); //database configuration
autoIncrement.initialize(mongoose);

mongoose.pluralize(null);
//Define a schema
const Schema = mongoose.Schema;
const ocListSchema = new Schema({
 OCNumber: {
  type: String,
  required: true,
  unique:true ,
  trim: true
//   ref: 'OCNumber'
 },
 OCDate: {
  type: Date,
  trim: true
//   required: true
 },
 OCNotes: {
    type: String,
    trim: true
    // required: true
},
warranty:{
    type:String,
},
LRNumber:{
    type:String,
},
LRDate:{
    type:Date,
trim : true,
},
 Priority : {
    _id:{
        type:String,
    },
     name : {
        type :String,
        trim : true ,
     },
    },
 CustomerType :{
    _id:{
        type:String,
    },
     name:{
         type:String ,
     },
    },
 BranchID :{
    _id:{
        type:String,
    },
     name :{
         type:String ,
     },
 },
 ProductID :[{
     code:{
         type:String,
     },
    _id:{
        type:String,
    },
     name:{
         type:String ,
     },
  }],

 SubAssemblyIDs:[
     {
         name :{
             type:String,
         },
         code:{
             type:String,
         }
     }
 ],
SpareIDs :[
    {
        name:{
            type:String,
        },
        code:{
            type:String,
        }
    }
],
InvDateByBranch:{
    type: Date
},
Customer :{
        _id:{
            type:String
        },
        name:{
            type:String,
        },
        address:{
            type:String,
        },
        city:{
            type:String,
        },
        contactNumber :{
            type:String,
        },
        CustEmailID :{
            type:String,
        },
        state:{
            type:String,
        },
        zip:{
            type:String,
        },
        landlineNumber:{
            type:String ,
        },
        country:{
            type:String,
        },
    },
    typeOfSale: {
        type: String,
    },
    CustAddrByBranch: {
        type: String,
    },
    NotesByBranch: {
        type: String,
    },
    CustPhoneByBranch: {
        type: Number,
    },
    TransportByBranch: {
        type: String,
    },
    BrinvNum: {
        type: String,
    },
    BrinvDocAttached:{
        type: Boolean,
    },
BrInstaDocAttached:{
    type:Boolean,
},
Status:{
    name:{
        type:String ,
    }
},
CreatedBy:{
    type:String,
},
UpdatedBy:{
    type:String,
},
CreatedDate :{
    type: Date,
},
UpdatedDate:{
    type:Date,
    trim : true,
},
Installation:{
    installationDate:{
        type:Date,
        trim : true,
    },
    installationComplete :{
        type:Boolean,
    },
    installationCompleteDate:{
        type:Date,
        trim : true,
    },
    invoiceDate:{
        type:Date,
        trim : true,
        
    },
    installationTechnician:{
        type:String,
    },
    technicianContact:{
        type:String,
    },
    transport:{
        type:String,
    },
    invoiceNumber:{
        type:String,
    }

},
SerialNumbers:[
    {
        ID:{
            type:String,
        },
        name:{
            type:String,
        },
        srno:{
            type:String,
        }

    }
],
docAttachedCounter :{
    type:Number,
    default:0,
},
StatusLog:[
    {
        UserName:{
            type:String,
        },
        PreviousStatus:{
            type:String
        },
        ChangedStatus:{
            type:String,
        },
        Date:{
            type:Date,
trim : true
        },
        AssignTo :{
            type:String
        }
    }
]

});
//ocListSchema.plugin(autoIncrement.plugin,{model:'ocList',field :'OCNumber',startAt: 20191000,});

// var ocList = mongoose.model('ocList', ocListSchema),
// ocList = new ocList();
module.exports = mongoose.model('ocList', ocListSchema);