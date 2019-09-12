const ocListModel = require('../models/ocList');
const userModel = require('../models/users');
const modbusModel = require('../models/modbus');
const modbusConsolidatedModel = require('../models/modbusConsoldated');
const userRoleModel = require('../models/userRole');
module.exports = {
   
   modbusConsolidatedGetAll: function(req, res, next) {
      let modbusConsoldated = {
         seqNumber : req.body.output[0],
         HMINo : req.body.output[1]
      };
      console.log("output",req.body.output)
      let resultModbus=[];
      modbusConsolidatedModel.find(modbusConsoldated, function(err, result){
        if (err){
         res.json({status:"error", message: "Invalid Oc Number or !!!", data:{OCNumber: OCNumber}});
        } else{
            resultModbus.push(result[0].seqNumber,result[0].HMINo, result[0].lotNo,result[0].colorSeq,result[0].quantity,result[0].timeDuration);
            // console.log("result",resultModbus)
            res.json(resultModbus);
        }
      });
     },
   addModbusConsolidated: function(req, res, next) {
   var modbusConsoldated = new modbusConsolidatedModel ({
      seqNumber: req.body.seqNumber,
      HMINo : req.body.HMINo,
      lotNo: req.body.lotNo,
      colorSeq:req.body.colorSeq,
      quantity: req.body.quantity,
      timeDuration: req.body.timeDuration,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
   });
   modbusConsoldated.save( function(err, result){
      if (err)
         next(err);
      else
         res.json(result);
   });
   },
   updateModbusConsolidated: function(req, res, next) {
   // let modbusConsoldated = [];
   let reqModbusConsoldated = {
      seqNumber : req.body.output[0],
      HMINo : req.body.output[1]
   };
   console.log("update",req.body.output)
   var modbusConsoldated =  {
      seqNumber: req.body.output[0],
      HMINo : req.body.output[1],
      lotNo: req.body.output[2],
      startTime: req.body.output[3],
      endTime: req.body.output[4],
   };
   modbusConsolidatedModel.findOneAndUpdate(reqModbusConsoldated,modbusConsoldated, function(err, result){
      if (err){
         next(err);
      } else{
         // modbusConsoldated.push({lotNo: movies[0], colorSeq: movies[1], quantity: movies[2],timeDuration:movies[3],endTime: movies[4]});
         res.json(result);
      }
   });
   },
   modbusHMI: function(req, res, next) {
     // movieModel.findByIdAndUpdate(req.params.movieId,{name:req.body.name}, function(err, movieInfo){
       let jsonData =[1,22,3232,5,6];
        res.json(jsonData);
    //   }
     // });
   },
   modbusAddd: function(req, res,next) {
      // console.log(req.body)
      const d = new Date();


      var data = JSON.stringify(req.body.output)

         var ocList = new modbusModel ({
              test:data,
              HMINo : req.body.HMINo
          });

          // Saving the model to the database //                   
          ocList.save(function(err,result) {
                     
            if (err)
              res.json({status:"success",message:"something looks wrong!!!",data:err})

                 //next(error)
            // If successfuly saved //
            else 
                res.json({status:"success",message:" Added successfully!!!",data:result})
        });
   },
   updateStatus:function(req,res,next){

      let roleName = req.body.roleName;
      let status = req.body.status;
      let ocId = req.body.ocId;
      let branchName = req.body.branchName;
      let updateStatus;
      let userName = req.body.userName;
      let AssignTo ;
      let changeStatusFlag =true;
      if (status == "Installation Complete" )
         updateStatus = "Closed";
      else if ((roleName == "Admin" || roleName == "QA Team") && status=="New") {
         updateStatus = "In Progress - Sales";
         userRoleModel.find({"RoleName":"Sales Team"},function(err,result){
            if(result){
               userModel.find({"RoleId":result[0]._id},function(err,result){
                  if(result){
                     AssignTo = result[0].name;
                  }
               })
            }
         
         })
        
      }
      else if(roleName=="Sales Team" && branchName && status != "In Progress - Branch/Dealer"){
         updateStatus="In Progress - Branch/Dealer";
         userModel.find({"branchId":req.body.branchId},function(err,result){
            if (err) {
               console.log(err)
            }
            else{
               AssignTo = result[0].name
            }
         }
         )}
      else
         changeStatusFlag = false;
        
      setTimeout(function(){if (changeStatusFlag){
         let d = new Date()
         query={
            "$push": {
               "StatusLog": {
                     "UserName": userName,
                     "PreviousStatus": status,
                     "ChangedStatus":updateStatus,
                     "Date":d,
                     "AssignTo":AssignTo

               }
            },
            "Status":{
               "name":updateStatus
            }
         }
         ocListModel.findOneAndUpdate({
            _id: ocId
         }, query, function(err, success) {
            if (success)
               res.json({status:"success", message: "OC Status updated Successfully!!!", data:null});
            else 
               res.json({status:"error", message: "Invalid OC ID", data:err});
         });
      }
      else
         res.json({status:"error", message: "Invalid Transfer", data:null});

            
         }, 1000);
   },
   getScanOcNumber: function(req, res, next) {
         ocListModel.find({ "OCNumber":req.body.OCNumber},function(err,result){
            if(result)
               res.json({status:"success",message:"Oc List found!!!",data:{ocList:result}})
            else
               res.json({status:"error",message:"No Oc List found!!!",data:err})  
         });
   },
   getByOCNumber: function(req, res, next) {

      let roleName = req.body.roleName;
      // console.log("function callaed")
      // console.log(req.body)
      if (roleName == "Admin" || roleName == "QA Team" || roleName == "Sales Team" ) {
         ocListModel.find({ "OCNumber":req.body.OCNumber},function(err,result){
            if(result)
            {
               // console.log(result[0])
               res.json({status:"success",message:"Oc List found!!!",data:{ocList:result}})
            }
            else
               res.json({status:"error",message:"No Oc List found!!!",data:err})
                  
         });
         
      } else if (roleName == "Branch/Dealer") {
         if(req.body.branchId){
            ocListModel.find({"OCNumber":req.body.OCNumber,"BranchID._id":req.body.branchId},function(err,result){
               if(result)
                  res.json({status:"success",message:"Oc List found!!!",data:{ocList:result}})
               else
                  res.json({status:"error",message:"No Oc List found!!!",data:err})
                     
            });
         }
      }

   },
   getByRoleName: function(req, res, next) {
      let roleName = req.body.roleName;
      if (req.body.Priority) {
         if (roleName == "Admin" || roleName == "QA Team" ) {
            ocListModel.find({"Priority.name":req.body.Priority , "Status.name" :{ $ne:"Closed" } },function(err,result){
               if(result)
                  res.json({status:"success",message:"Oc List found!!!",data:{ocList:result}})
               else
                  res.json({status:"error",message:"No Oc List found!!!",data:err})
                     
            });
            
         }else if (roleName == "Branch/Dealer") {
            if(req.body.branchId){
               ocListModel.find({"Status.name" :{ $in:["In Progress - Branch/Dealer","Installation Scheduled","Installation Complete"] },"Priority.name":req.body.Priority,"BranchID._id":req.body.branchId},function(err,result){
                  if(result)
                     res.json({status:"success",message:"Oc List found!!!",data:{ocList:result}})
                  else
                     res.json({status:"error",message:"No Oc List found!!!",data:err})
                        
               });
            }
         }else if(roleName == "Sales Team") {
            ocListModel.find({"Status.name" :{ $in:["In Progress - Sales","In Progress - Branch/Dealer","Installation Scheduled","Installation Complete"]  },"Priority.name":req.body.Priority},function(err,result){
               if(result)
                  res.json({status:"success",message:"Oc List found!!!",data:{ocList:result}})
               else
                  res.json({status:"error",message:"No Oc List found!!!",data:err})
                     
            });
         }
      }else if (roleName == "Branch/Dealer") {
         if(req.body.branchId){
            ocListModel.find({"Status.name" :{ $in:["In Progress - Branch/Dealer","Installation Scheduled","Installation Complete"] },"BranchID._id":req.body.branchId},function(err,result){
               if(result)
                  res.json({status:"success",message:"Oc List found!!!",data:{ocList:result}})
               else
                  res.json({status:"error",message:"No Oc List found!!!",data:err})
                     
            });
         }
      }
      else if (roleName == "Sales Team") {
         ocListModel.find({"Status.name" :{ $in:["In Progress - Sales","In Progress - Branch/Dealer","Installation Scheduled","Installation Complete"] }},function(err,result){
         //   console.log(roleName)
            if(result)
               res.json({status:"success",message:"Oc List found!!!",data:{ocList:result}})
            else
               res.json({status:"error",message:"No Oc List found!!!",data:err})
                  
         });
      }else{
         ocListModel.find({ "Status.name" :{ $ne:"Closed" }} ,function(err,result){
            if(result)
               res.json({status:"success",message:"Oc List found!!!",data:{ocList:result}})
            else
               res.json({status:"error",message:"Something went wrong!!!",data:err})
                  
         });
      }
   },
   create: function(req, res,next) {

      const d = new Date();
         var ocList = new ocListModel ({
              OCDate: req.body.OCDate,
              OCNotes: req.body.OCNotes,
              Priority: req.body.Priority,
              CustomerType: req.body.CustomerType,
              BranchID: req.body.BranchID,
              ProductID: req.body.ProductID,
              SubAssemblyIDs: req.body.SubAssemblyIDs,
              SpareIDs: req.body.SpareIDs,
              Status:req.body.Status,
              Customer:req.body.Customer,
              Installation:req.body.Installation,
              CreatedBy : req.body.CreatedBy,
              UpdatedBy : req.body.UpdatedBy,
              CreatedDate : req.body.CreatedDate,
              UpdatedDate : req.body.UpdatedDate,
              SerialNumbers : req.body.SerialNumbers,
              StatusLog : {
                 UserName :req.headers['x-auth-username'],
                 PreviousStatus : "New",
                 ChangedStatus:"New",
                 Date: d,
                 AssignTo : req.headers['x-auth-username'],
              }
          });
         // ocList.StatusLog = {
         //    "UserName": 
         //    "PreviousStatus": "New",
         //    "ChangedStatus":"New",
         //    "Date":d
         // }

          ocListModel.findOne({
              'OCNumber': req.body.OCNumber
          }, function(err, result) {
              // If email exists //
              if (result)
                  res.json({status:"error",message:"Oc List already Exist!!!",data:null})
              // If email doesn't exists //
              else {

                  // let nnextCount = ocList.nextCount(function(){});
                  // console.log("next",nnextCount)
                  // ocList.OCNumber = nnextCount;
                  // Saving the model to the database //                   
                  ocList.save(function(err,result) {
                     
                      ocList.nextCount(function(err, count) {
                        // console.log("ccccc",count)
                        // count === 101 -> true
                 
                        // ocList.resetCount(function(err, nextCount) {
                           
                        //    console.log("next",nextCount)
                        //     // nextCount === 100 -> true
                 
                        // });
                 
                    });
                      if (err)
                        res.json({status:"success",message:"something looks wrong!!!",data:err})
          
                           //next(error)
                      // If successfuly saved //
                      else 
                          res.json({status:"success",message:"OC Added successfully!!!",data:result.OCNumber})
                  });
              }
          });
   },
   getOcNumber: function(req, res, next) {
      ocListModel.nextCount(function(err, OCNumber){
      if (err) 
         next(err)
         else 
         res.json({status:"success", message: "OC Number fetched!!!", data:{OCNumber: OCNumber}});

      })
   },
   getAll: function(req, res, next) {
      ocListModel.find({},function(err, ocList){
      if (err) 
         next(err)
         else 
         res.json({status:"success", message: "OC List fetched!!!", data:{ocList: ocList}});

      })
   },
   getClosedOCs: function(req, res, next) {
      let roleName = req.body.roleName;
      let branchId = req.body.branchId;

      if(req.body.Priority){
         if(roleName =="Branch/Dealer") {
            ocListModel.find({"Priority.name":req.body.Priority,"Status.name":"Closed","BranchID._id":branchId},function(err, ocList){
               if (err) 
                  next(err)
                  else 
                  res.json({status:"success", message: "OC List fetched!!!", data:{ocList: ocList}});
         
               })
         }else{
            ocListModel.find({"Priority.name":req.body.Priority,"Status.name":"Closed"},function(err, ocList){
               if (err) 
                  next(err)
                  else 
                  res.json({status:"success", message: "OC List fetched!!!", data:{ocList: ocList}});
         
               })
         }   
      }
      else{
         if(roleName =="Branch/Dealer") {
            ocListModel.find({"Status.name":"Closed","BranchID._id":branchId},function(err, ocList){
               if (err) 
                  next(err)
                  else 
                  res.json({status:"success", message: "OC List fetched!!!", data:{ocList: ocList}});
         
               })
         }else{
            ocListModel.find({"Status.name":"Closed"},function(err, ocList){
               if (err) 
                  next(err)
                  else 
                  res.json({status:"success", message: "OC List fetched!!!", data:{ocList: ocList}});
         
               })
         }
      }
   },
   updateOC:function(req, res,next) {

         let d = new Date()
         let ocList = req.body;
         let update;
         update = ocList;
                  
         if(req.body.Installation){
            
            let installationDate = req.body.Installation.installationDate;
            if(req.body.Installation.installationComplete){
               updateStatus="Installation Complete";
               ocList.Status.name = updateStatus;
            }
            else if(installationDate){
                  ocList.Status.name = updateStatus;
                  updateStatus="Installation Scheduled";
               }
         }
         
         ocListModel.findOneAndUpdate({
             _id: req.body._id
         },update, function(err, success) {
             // If success //
             if (success)
               res.json({status:"success", message: "OC Updated Successfully!!!", data:success});
             else 
             res.json({status:"error", message: "Invalid OC ID", data:err});

            });
   },

}