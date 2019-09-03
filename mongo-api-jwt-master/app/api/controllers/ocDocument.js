const ocDocumentModel = require('../models/ocDocument');
var multer = require('multer');


// app/api/controllers/userRole.js
module.exports = {
   download : function(req,res,next){
      console.log("get downlad")
      let documentId =req.params.documentId;
      // console.log(path)
      ocDocumentModel.find( {_id:documentId},function(err,result){
         // console.log(result)
         if (result.length){
            path = result[0].filePath +".";
            // console.log("path",path)
            res.download(path); 
            // res.json({status:"success",message:"!!!",data:path})
     
         }
         else
            res.json({status:"error",message:"Invalid OC ID!!!",data:null})
      });
   },
 save: function(req, res, next) {
   
   const fileUploadPath = require('../../../config/config')
   var dateObj = new Date();
   // console.log("dateObj",dateObj)
   let mlist = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

   let Yearr = dateObj.getUTCFullYear();
   let monthName =  dateObj.getMonth() ;  
   monthName = mlist[monthName];
   let dateName = dateObj.getDate();

   var dir = "./" + fileUploadPath.fileUploadPath + "/" + Yearr + "/" + monthName + "/" + dateName + "/";
   // console.log("dir",dir)
   let fileInfo = JSON.parse(req.body.FileInfo);
   var ocDocument = new ocDocumentModel ({
      ocid:fileInfo.ocid, // To generate a unique id //
      documentname: fileInfo.documentname,
      uploadedby: fileInfo.uploadedby,
      uploadeddate: fileInfo.uploadeddate,
      filePath: dir + fileInfo.documentname,
      notes:fileInfo.notes,
   });
   // console.log(ocDocument)
// console.log("sadsa",ocDocument)
   ocDocument.save(function(err,result) {
      if (err)
        res.json({status:"error",message:"something looks wrong!!!",data:err});
      else 
          res.json({status:"success",message:"Oc Document Uploaded successfully!!!",data:null})
  });
   
 },
 getByOCID: function(req, res, next) {
   
   ocDocumentModel.find( {ocid:req.body.ocid},function(err,result){
      if (result){
         let x =1;
         for (i in result) {   
            result[i].srNo=x;
            x=x+1;
         }
         res.json({status:"success",message:"Oc with Documents found!!!",data:{ocDocument:result}})
      }
      else if (err)
         res.json({status:"error",message:"Invalid OC ID!!!",data:null})
      });

   },

   deleteDocument :function(req,res,next){
      ocDocumentModel.findByIdAndRemove(req.params.documentId , function(err,result) {
         if (result) {
            res.json({status:"success",message:"Document Deleted Successfully!!!",data:result})
         }
         else {
            res.json({status:"error",message:"Invalid Document Id",data:err})
         }
     });
   }
}