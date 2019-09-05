const mongoose = require('mongoose');
let autoIncrement = require('mongoose-auto-increment');

// global.mongoose = require('./config/database'); //database configuration
autoIncrement.initialize(mongoose);

mongoose.pluralize(null);
//Define a schema
const Schema = mongoose.Schema;
const ocListSchema = new Schema({
 OCNumber: {
  type: Number,
  required: true,
  unique:true ,
  trim: true,
  ref: 'OCNumber'
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
 ProductID :{
     code:{
         type:String,
     },
    _id:{
        type:String,
    },
     name:{
         type:String ,
     },
  },
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
Customer :{
        _id:{
            type:String
        },
        name:{
            type:String,
        },
        city:{
            type:String,
        },
        contactNumber:{
            type:String
        }
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
},
Installation:{
    installationDate:{
        type:Date,
    },
    installationComplete :{
        type:Boolean,
    },
    installationCompleteDate:{
        type:Date,
    },
    invoiceDate:{
        type:Date,
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
            type:Date
        },
        AssignTo :{
            type:String
        }
    }
]

});
ocListSchema.plugin(autoIncrement.plugin,{model:'ocList',field :'OCNumber',startAt: 20191000,});

var ocList = mongoose.model('ocList', ocListSchema),
ocList = new ocList();
module.exports = mongoose.model('ocList', ocListSchema);