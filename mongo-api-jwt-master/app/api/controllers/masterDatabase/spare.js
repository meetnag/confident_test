const spareModel = require('../../models/masterDatabase/spare');
module.exports = {

getAll: function(req, res, next) {
  // let moviesList = [];
  spareModel.find({}, function(err, spareList){
   if (err){
    next(err);
   } else{
    res.json({status:"success", message: "Spare list Fetched!!!", data:{spareList: spareList}});
       
   }
});
 },
 updateById: function(req, res, next) {
  
  spareModel.findByIdAndUpdate(req.body.spareId,{name:req.body.name , code : req.body.code}, function(err, spareInfo){
  if(err)
      next(err);
    else {
      res.json({status:"success", message: "Spare updated successfully!!!", data:null});
    }
    });
 },
 create: function(req, res, next) {
  // let moviesList = [];
  // console.log(req.body)
  let spareData = req.body
  spareModel.create( spareData, function (err, result) {
    if (err){
      if(err.code == 11000)
        res.json({status:"error",message:"Duplicate Entry",data:err})
      else
      res.json({status:"error",message:"Something is wrong",data:err})
    }
    else
     res.json({status: "success", message: "New Spare added successfully!!!", data: null});
    
  });

 },

 deleteById: function(req, res, next) {
  spareModel.findByIdAndRemove(req.params.spareId, function(err, spareList){
   if(err)
    next(err);
   else {
    res.json({status:"success", message: "Spare deleted successfully!!!", data:null});
   }
  });
 },
}