const ocListModel = require('../models/ocList');
module.exports = {
   getList: function(req, res, next) {

      let roleName = req.body.roleName;
      let branchId = req.body.branchId
      let ocListModelQuery = {}
      let fromDate = req.body.fromDate
      let toDate = req.body.toDate
      let barChartQuery = [];
      let pieChartQuery = [];
      let multipleBarCharts = [];
      let multipleClosedOcCountArrayQuery = [];
      if (roleName == "Branch/Dealer") {
         if(fromDate){
            pieChartQuery = [
               {
                  "$match" : {
                     "OCDate":{$gte : new Date(fromDate) , $lt : new Date(toDate)},
                     "Status.name": {$nin: ["New","In Progress - Sales"] },
                     "BranchID._id":branchId
                  }
               },
             ];
             multipleBarCharts = [
               {
                  "$match" : {
                     "OCDate":{$gte : new Date(fromDate) , $lt : new Date(toDate)},
                     "Status.name": {$nin: ["New","In Progress - Sales"] },
                     "BranchID._id":branchId
                  }
               },
             ];
            barChartQuery = [
               {
                  "$match" : {
                     "OCDate":{$gte : new Date(fromDate) , $lt : new Date(toDate)},
                     "Status.name": {$nin: ["New","In Progress - Sales"] },
                     "BranchID._id":branchId
                  }
               },
             ];

             multipleClosedOcCountArrayQuery = [
               {
                  "$match" : {
                     "OCDate":{$gte : new Date(fromDate) , $lt : new Date(toDate)},
                     "Status.name": {$nin: ["New","In Progress - Sales"] },
                     "BranchID._id":branchId
                  }
               },
             ];

            ocListModelQuery = {
               "Status.name": {$nin: ["New","In Progress - Sales"] },
               "OCDate":{$gte : fromDate,$lt : toDate},
               "BranchID._id" : branchId,
            }
         }else {
            pieChartQuery = [
               {
                  "$match" : {
                     "Status.name": {$nin: ["New","In Progress - Sales"] },
                     "BranchID._id":branchId
                  }
               },
             ];
             multipleBarCharts = [
               {
                  "$match" : {
                     "Status.name": {$nin: ["New","In Progress - Sales"] },
                     "BranchID._id":branchId
                  }
               },
             ];
            barChartQuery = [
               {
                  "$match" : {
                     "Status.name": {$nin: ["New","In Progress - Sales"] },
                     "BranchID._id":branchId
                  }
               },
             ];
             multipleClosedOcCountArrayQuery = [
               {
                  "$match" : {
                     "Status.name": {$nin: ["New","In Progress - Sales"] },
                     "BranchID._id":branchId
                  }
               },
             ];
            ocListModelQuery = {
               "Status.name": {$nin: ["New","In Progress - Sales"] },
               "BranchID._id":branchId,
            }
         } 
      }
      else if (roleName == "Sales Team") {

         if(fromDate && branchId){

            pieChartQuery = [
               {
                  "$match" : {
                     "OCDate":{$gte : new Date(fromDate) , $lt : new Date(toDate)},
                     "Status.name": {$ne: "New" },
                     "BranchID._id":branchId
                  }
               },
             ];
             multipleBarCharts = [
               {
                  "$match" : {
                     "OCDate":{$gte : new Date(fromDate) , $lt : new Date(toDate)},
                     "Status.name": {$ne: "New" },
                     "BranchID._id":branchId
                  }
               },
             ];
            barChartQuery = [
               {
                  "$match" : {
                     "OCDate":{$gte : new Date(fromDate) , $lt : new Date(toDate)},
                     "Status.name": {$ne: "New" },
                     "BranchID._id":branchId
                  }
               },
             ];
             multipleClosedOcCountArrayQuery = [
               {
                  "$match" : {
                     "OCDate":{$gte : new Date(fromDate) , $lt : new Date(toDate)},
                     "Status.name": {$ne: "New" },
                     "BranchID._id":branchId
                  }
               },
             ];
            ocListModelQuery = {
               "Status.name": {$ne: "New" }, 
               "OCDate":{$gte : fromDate,$lt : toDate},
               "BranchID._id" : branchId,
            }
         }else if (fromDate){
            pieChartQuery = [
               {
                  "$match" : {
                     "OCDate":{$gte : new Date(fromDate) , $lt : new Date(toDate)},
                     "Status.name": {$ne: "New" },
                  }
               },
             ];
             multipleBarCharts = [
               {
                  "$match" : {
                     "OCDate":{$gte : new Date(fromDate) , $lt : new Date(toDate)},
                     "Status.name": {$ne: "New" },
                  }
               },
             ];
            barChartQuery = [
               {
                  "$match" : {
                     "OCDate":{$gte : new Date(fromDate) , $lt : new Date(toDate)},
                     "Status.name": {$ne: "New" },
                  }
               },
             ];
             multipleClosedOcCountArrayQuery = [
               {
                  "$match" : {
                     "OCDate":{$gte : new Date(fromDate) , $lt : new Date(toDate)},
                     "Status.name": {$ne: "New" },
                  }
               },
             ];
            ocListModelQuery = {
               "Status.name": {$ne: "New" },
               "OCDate":{$gte : fromDate,$lt : toDate},
            }
         }else if (branchId){

            pieChartQuery = [
               {
                  "$match" : {
                     "Status.name": {$ne: "New" },
                     "BranchID._id":branchId
                  }
               },
             ];

             multipleBarCharts = [
               {
                  "$match" : {
                     "Status.name": {$ne: "New" },
                     "BranchID._id":branchId
                  }
               },
             ];

            barChartQuery = [
               {
                  "$match" : {
                     "Status.name": {$ne: "New" },
                     "BranchID._id":branchId
                  }
               },
             ];
             multipleClosedOcCountArrayQuery = [
               {
                  "$match" : {
                     "Status.name": {$ne: "New" },
                     "BranchID._id":branchId
                  }
               },
             ];

            ocListModelQuery = {
               "Status.name": {$ne: "New" },
               "BranchID._id" : branchId,
            }
         }else {
            pieChartQuery = [
               {
                  "$match" : {
                     "Status.name": {$ne: "New" }
                  }
               },
             ];
             multipleBarCharts = [
               {
                  "$match" : {
                     "Status.name": {$ne: "New" }
                  }
               },
             ];
            barChartQuery = [
               {
                  "$match" : {
                     "Status.name": {$ne: "New" }
                  }
               },
             ];

             multipleClosedOcCountArrayQuery = [
               {
                  "$match" : {
                     "Status.name": {$ne: "New" }
                  }
               },
             ];

            ocListModelQuery = {
               "Status.name": {$ne: "New" },
            }
         } 
      } else {
         if(fromDate && branchId){
            pieChartQuery = [
               {
                  "$match" : {
                     "OCDate":{$gte : new Date(fromDate) , $lt : new Date(toDate)},
                     "Status.name": {$ne: "Closed" },
                     "BranchID._id":branchId
                  }
               },
             ];
             multipleBarCharts = [
               {
                  "$match" : {
                     "OCDate":{$gte : new Date(fromDate) , $lt : new Date(toDate)},
                     "Status.name": {$ne: "Closed" },
                     "BranchID._id":branchId
                  }
               },
             ];
            barChartQuery = [
               {
                  "$match" : {
                     "OCDate":{$gte : new Date(fromDate) , $lt : new Date(toDate)},
                     "Status.name": {$ne: "Closed" },
                     "BranchID._id":branchId
                  }
               },
             ];

             multipleClosedOcCountArrayQuery = [
               {
                  "$match" : {
                     "OCDate":{$gte : new Date(fromDate) , $lt : new Date(toDate)},
                     "Status.name": {$ne: "Closed" },
                     "BranchID._id":branchId
                  }
               },
             ];

            ocListModelQuery = {
               "OCDate":{$gte : fromDate,$lt : toDate},
               "BranchID._id": branchId,
               "Status.name": {$ne: "Closed" } 
            }
         }else if (fromDate){
            pieChartQuery = [
               { 
                 $match: {
                  "OCDate":{$gte : new Date(fromDate) , $lt : new Date(toDate)},
                  "Status.name": {$ne: "Closed"}                
                 }
               }
              ]
            
            multipleBarCharts = [
            { 
               $match: {
               "OCDate":{$gte : new Date(fromDate) , $lt : new Date(toDate)},
               "Status.name": {$ne: "Closed"}                
               }
            }
            ]
            
            barChartQuery = [
               { 
                 $match: {
                  "OCDate":{$gte : new Date(fromDate) , $lt : new Date(toDate)},
                  "Status.name": {$ne: "Closed"}                
                 }
               }
              ]
            
              multipleClosedOcCountArrayQuery = [
               { 
                 $match: {
                  "OCDate":{$gte : new Date(fromDate) , $lt : new Date(toDate)},
                  "Status.name": {$ne: "Closed"}                
                 }
               }
              ]
            
            ocListModelQuery = {
               "OCDate":{$gte : fromDate,$lt : toDate},
               "Status.name": {$ne: "Closed"} 
            }
         }
         else if (branchId){

            pieChartQuery = [
               {
                  "$match" : {
                     "BranchID._id": branchId,
                     "Status.name": {$ne: "Closed"} 
                  }
               },
             ];

             multipleBarCharts = [
               {
                  "$match" : {
                     "BranchID._id": branchId,
                     "Status.name": {$ne: "Closed"} 
                  }
               },
             ];

            barChartQuery = [
               {
                  "$match" : {
                     "BranchID._id": branchId,
                     "Status.name": {$ne: "Closed"} 
                  }
               },
             ];

             multipleClosedOcCountArrayQuery = [
               {
                  "$match" : {
                     "BranchID._id": branchId,
                     "Status.name": {$ne: "Closed"} 
                  }
               },
             ];

            ocListModelQuery = {
               "BranchID._id": branchId,
               "Status.name": { 
                  $ne: "Closed" 
               } 
            }
         } else {
            barChartQuery = [
               // {
               //    $match : {"Status.name": { $ne : "Closed"}}
               // },
             ];

            pieChartQuery = [
               // {
               //    $match : {"Status.name": { $ne : "Closed"}}
               // },
             ];

            multipleBarCharts = [{
               $match : {"Status.name" :{ 
                  $in :["In Progress - Branch/Dealer","Installation Scheduled"]
                  }
               }
            }];

            multipleClosedOcCountArrayQuery =  [{
               $match : {"Status.name" :{ 
                  $in :["Closed","Installation Complete"]
                  }
               }
            }];
            ocListModelQuery = {
               // "Status.name": { 
               //    "$ne": "Closed" 
               // }
            }
         }
      }
      ocListModel.find(ocListModelQuery, null, { sort: { OCDate: -1 } }, function (err, result) {
         if (result){
               let totalCount  = result.length;
               
               let branchArray=[] ;
               let ocCountArray=[] ;

               barChartQuery.push(
                  {
                     "$group": {
                     "_id": "$BranchID.name",
                     "total": {$sum: 1}
                   }
                  } ,
                  {"$sort": { "BranchID.name": 1 }}
               )

               ocListModel.aggregate(barChartQuery, function(err, logs){
               if (err) { return def.reject(err); }
                  for(i = 0 ; i < logs.length ; i++){
                     branchArray[i] =logs[i]._id;
                     ocCountArray[i] = logs[i].total;
                  } 
               });

               // pie chart
               pieChartQuery.push( 
                  {$group: {
                    _id: "$Priority.name",
                    total: {$sum: 1}
                  }},
                  { "$sort": { "BranchID.name": 1 } }
                );
               
               let priorityArray=[] ;
               ocListModel.aggregate(pieChartQuery, function(err, logs){
               if (err) { return def.reject(err); }
                  for(i = 0 ; i < logs.length ; i++){
                     priorityArray.push({
                        name : logs[i]._id,
                        value : logs[i].total
                     }); 
                  } 
               });

               // multiple bar charts
               multipleBarCharts[0]["$match"]["Status.name"] =    {
                  $in :["In Progress - Branch/Dealer",
                  "Installation Scheduled"]
               }

               multipleBarCharts.push ( 
                  {$group: {
                  _id:"$BranchID.name", 
                  total:{$sum:1}
                    
                  }},
                  { "$sort": { "BranchID.name": 1 } }
               );
               
                 
                  // return target;
            //   }

               let multiplePendingBranchArray=[];
               let multiplePendingOcCountArray =[];

               ocListModel.aggregate(multipleBarCharts, function(err, logs){
               if (err) { return def.reject(err); }
                  for(i = 0 ; i < logs.length ; i++){
                     multiplePendingBranchArray[i] =logs[i]._id;
                     multiplePendingOcCountArray[i] = logs[i].total
                  } 
               //    for (var argi = 1; argi < branchArray.length; argi++) {
               //       var source = branchArray[argi];
               //       for (var key in source) {
               //           if (!(key in multiplePendingBranchArray)) {
               //             multiplePendingBranchArray[key] = 0;
               //           }
               //           for (var i = 0; i < source[key].length; i++) {
               //               target[key].push(source[key][i]);
               //           }
               //       }
               //   }
                  var sum = multiplePendingOcCountArray.reduce(function(a, b) { return a + b; }, 0);
               });
               
                // multiple bar charts
                multipleClosedOcCountArrayQuery[0]["$match"]["Status.name"] =    {
                  $in :["Closed","Installation Complete"]
               }
               

               multipleClosedOcCountArrayQuery.push(  
                  {$group: {
                  _id:"$BranchID.name", 
                  total:{$sum:1}
                  }},
                  { "$sort": { "BranchID.name": 1 } }
               );
               

               let multipleClosedOcCountArray =[];
               let multipleClosedOcBranchNameArray = [];

               ocListModel.aggregate(multipleClosedOcCountArrayQuery, function(err, logs){
               if (err) { return def.reject(err); }
                  for(i = 0 ; i < logs.length ; i++){
                     multipleClosedOcBranchNameArray[i] = logs[i]._id
                     multipleClosedOcCountArray[i] = logs[i].total
                  } 
                  const arrSum = multipleClosedOcCountArray => multipleClosedOcCountArray.reduce((a,b) => a + b, 0)
               });
               

               ocListModelQuery["Status.name"] = {
                  $in:[
                     "Installation Complete",
                     "Closed",
                  ],
               }
               ocListModel.find(ocListModelQuery, function (err, result1) {
                  if(result1){
                     let compeletedAndClosedCount = result1.length;
                     ocListModelQuery["Status.name"] = {
                        $in:[
                           "Installation Scheduled",
                           "In Progress - Branch/Dealer",
                        ],
                     }
                     
                     ocListModel.find(ocListModelQuery, function (err, result2) {
                        if(result2){
                           let pendingCount = result2.length;
                           res.json({ status: "success", message: "Oc List found!!!", data:  {"ocList":result,"barChart" :{"branchArray":branchArray , "OcListCountArray":ocCountArray} ,"multipleCharts":{"Total":{"branchName" :branchArray,"TotalOcCountArray":ocCountArray} ,"pending":{"branchName": multiplePendingBranchArray ,"PendingOcCountArray":multiplePendingOcCountArray},"Closed":{"branchName":multipleClosedOcBranchNameArray , "ClosedOcCountArray":multipleClosedOcCountArray}},"priortyArray" : priorityArray ,"totalCount":totalCount,"compeletedAndClosedCount" : compeletedAndClosedCount , "pendingCount":pendingCount}  })
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