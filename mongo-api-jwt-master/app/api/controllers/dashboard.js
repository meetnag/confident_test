const ocListModel = require('../models/ocList');
module.exports = {
   getList: function(req, res, next) {

      let roleName = req.body.roleName;
      let branchId = req.body.branchId
      let ocListModelQuery = {}
      let fromDate = req.body.fromDate
      let toDate = req.body.toDate

      if (roleName == "Branch/Dealer") {
         if(fromDate){
            ocListModelQuery = {
               "Status.name" : { 
                     "$in": [
                        "In Progress - Branch/Dealer",
                        "Installation Scheduled",
                        "Installation Complete"
                     ] 
                  
               }, 
               "OCDate":{
                  $gte : fromDate,
                  $lt : toDate
               },
               "BranchID._id" : branchId,
            }
         }else {
            ocListModelQuery = {
               "Status.name": { 
                     $in: [
                        "In Progress - Branch/Dealer",
                        "Installation Scheduled",
                        "Installation Complete"
                     ] 
               }, 
               "BranchID._id":branchId,
            }
         } 
         // if (branchId) {
            
         // }
      }
      else if (roleName == "Sales Team") {

         if(fromDate && branchId){
            ocListModelQuery = {
               "Status.name" : { 
                     "$in": [
                        "In Progress - Sales",
                        "In Progress - Branch/Dealer",
                        "Installation Scheduled",
                        "Installation Complete"
                     ] 
               }, 
               "OCDate":{
                  $gte : fromDate,
                  $lt : toDate
               },
               "BranchID._id" : branchId,
            }
         }else if (fromDate){
            ocListModelQuery = {
               "Status.name" : { 
                     "$in": [
                        "In Progress - Sales",
                        "In Progress - Branch/Dealer",
                        "Installation Scheduled",
                        "Installation Complete"
                     ] 
               }, 
               "OCDate":{
                  $gte : fromDate,
                  $lt : toDate
               }
            }
         }else if (branchId){
            ocListModelQuery = {
               "Status.name" : { 
                     "$in": [
                        "In Progress - Sales",
                        "In Progress - Branch/Dealer",
                        "Installation Scheduled",
                        "Installation Complete"
                     ] 
               },
               "BranchID._id" : branchId,
            }
         }else {
            ocListModelQuery = {
               "Status.name": { 
                     $in: [
                        "In Progress - Sales",
                        "In Progress - Branch/Dealer",
                        "Installation Scheduled",
                        "Installation Complete"
                     ] 
               },
            }
         } 

         // ocListModel.find(ocListModelQuery, null, { sort: { OCDate: -1 } }, function (err, result) {
         //    if (result)
         //       res.json({ status: "success", message: "Oc List found!!!", data: { ocList: result } })
         //    else
         //       res.json({ status: "error", message: "No Oc List found!!!", data: err })

         // });
      } else {
         if(fromDate && branchId){
            ocListModelQuery = {
               "OCDate":{
                  $gte : fromDate,
                  $lt : toDate
               },
               "BranchID._id": branchId,
               "Status.name": { 
                  $ne: "Closed" 
               } 
            }
         }else if (fromDate){
            ocListModelQuery = {
               "OCDate":{
                  $gte : fromDate,
                  $lt : toDate
               },
               "Status.name": { 
                  $ne: "Closed" 
               } 
            }
         }
         else if (branchId){
            ocListModelQuery = {
               "BranchID._id": branchId,
               "Status.name": { 
                  $ne: "Closed" 
               } 
            }
         } else {
            ocListModelQuery = {
               "Status.name": { 
                  $ne: "Closed" 
               }
            }
         }
         // ocListModel.find(ocListModelQuery, null, { sort: { OCDate: -1 } }, function (err, result) {
         //    if (result)
         //       res.json({ status: "success", message: "Oc List found!!!", data: { ocList: result } })
         //    else
         //       res.json({ status: "error", message: "Something went wrong!!!", data: err })

         // });
      }
      ocListModel.find(ocListModelQuery, null, { sort: { OCDate: -1 } }, function (err, result) {
         if (result){
               let totalCount  = result.length;
               // delete ocListModelQuery['Status.name'];
               ocListModelQuery["Status.name"] = {
                  
                     $in:[
                        "Installation Complete",
                        "Closed",
                     ],
                  
               }
               ocListModel.find(ocListModelQuery, null, { sort: { OCDate: -1 } }, function (err, result1) {
                  if(result1){
                     let compeletedAndClosedCount = result1.length;
                     ocListModelQuery["Status.name"] = {
                  
                        $in:[
                           "Installation scheduled",
                           "In Progress - Branch/Dealer",
                        ],
                     
                     }
                     ocListModel.find(ocListModelQuery, null, { sort: { OCDate: -1 } }, function (err, result2) {
                        if(result2){
                           let pendingCount = result2.length;
                           res.json({ status: "success", message: "Oc List found!!!", data:  {"ocList":result,"totalCount":totalCount,"compeletedAndClosedCount" : compeletedAndClosedCount , "pendingCount":pendingCount}  })
                        }
                        
                     })
                  }
               });
            }
         else
            res.json({ status: "error", message: "No Oc List found!!!", data: err })
      });
   }
}