const ocListModel = require('../models/ocList');
const userModel = require('../models/users');
const modbusModel = require('../models/modbus');
const userRoleModel = require('../models/userRole');
module.exports = {
   
   modbusHMI: function(req, res, next) {
     // movieModel.findByIdAndUpdate(req.params.movieId,{name:req.body.name}, function(err, movieInfo){
       let jsonData =[1,22,3232,5,6];
        res.json(jsonData);
    //   }
     // });
     },

   modbusAddd: function(req, res,next) {
      console.log(req.body)
      const d = new Date();
         var ocList = new modbusModel ({
              test:req.body.output
          });
         // ocList.StatusLog = {
         //    "UserName": 
         //    "PreviousStatus": "New",
         //    "ChangedStatus":"New",
         //    "Date":d
         // }
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
      let installationComplete = req.body.installationComplete;
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
            // console.log("b",result)
            if(result){
               userModel.find({"RoleId":result[0]._id},function(err,result){
                  console.log("a",result)
                  if(result){
                     AssignTo = result[0].name;
                     console.log("assign to" ,AssignTo)
                  }
               })
            }
         
         })
        
      }
      else if(roleName=="Sales Team" && branchName ){//&& status != "In Progress - Branch/Dealer"){
         // console.log("in if")
         updateStatus="In Progress - Branch/Dealer";
         // console.log(req.body.branchId)
         userModel.find({"branchId":req.body.branchId},function(err,result){
            if (err) {
               console.log(err)
            }
            else{
               AssignTo = result[0].name
               // console.log("asdas",result)
            }
         }

         
         )
         // userModel.aggregate([
         //    {
         //      $lookup:
         //        {
         //          from: "userRole",
         //          localField: "_id",
         //          foreignField: "RoleId",
         //          as: "inventory_docs"
         //        }
         //   }
         // ]).exec(function(err,result){
         //    if (result ) console.log("dsa",result)
         //    else console.log(err)
         // })
         // userModel.find().populate('../models/userRole').exec(function(err, users) {
         //       console.log("sa",users)
         // });
      }
      else
         changeStatusFlag = false;
      // console.log("dad",changeStatusFlag)  
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
      // console.log(roleName)
      let Status =null;
      let query = {}
      // if(roleName !== "Admin" && roleName !== "QA Team") {
      //    // console.log("fsdf")
      //    if(roleName == "Sales Team")
      //       Status = "In Progress - Sales"
      //    else if (roleName == "Branch/Dealer")
      //       Status = "In Progress - Branch/Dealer";
      //       query= {
      //          "Status":{
      //             "name":Status,
      //          }
      //       }
      // }
      
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
         let roleName = req.body.roleName;
         let updateStatus;
         let ocList = req.body;
         let PreviousStatus  = req.body.Status.name
         let userName = req.body.userName
         let ChangeStausLog;
         let changeStatusFlag =false ;
         let update;
         update = ocList;
                  
         if(req.body.Installation){

            let installationDate = req.body.Installation.installationDate;
            if(req.body.Installation.installationComplete){
               updateStatus="Installation Complete";
               changeStatusFlag = true ;
            }
            else if(installationDate){
                  changeStatusFlag = true ;
                  updateStatus="Installation Scheduled";
               }
            

            // if (changeStatusFlag){
            //    ocList.Status={};
            //    ocList.Status.name = updateStatus;
            //    ChangeStausLog={
            //       "$push": {
            //          "StatusLog": {
            //                "UserName": userName,
            //                "PreviousStatus": PreviousStatus,
            //                "ChangedStatus":updateStatus,
            //                "Date":d
            //          }
            //       },
            //    }
            //    update = Object.assign(ocList, ChangeStausLog);
            // }
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