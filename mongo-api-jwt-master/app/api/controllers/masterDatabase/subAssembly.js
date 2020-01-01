const subAssemblyModel = require('../../models/masterDatabase/subAssembly');
module.exports = {

getAll: function(req, res, next) {
  // let moviesList = [];
  subAssemblyModel.find({}, null, { sort: { "name": 1 }}, function(err, subAssemblyList){
   if (err){
    next(err);
   } else{
    res.json({status:"success", message: "SubAssembly list Fetched!!!", data:{subAssemblyList: subAssemblyList}});
       
   }
});
 },
 updateById: function(req, res, next) {
  
  subAssemblyModel.findByIdAndUpdate(req.body.subAssemblyId,{name:req.body.name , code : req.body.code}, function(err, subAssemblyInfo){
  if(err)
      next(err);
    else {
      res.json({status:"success", message: "subAssembly updated successfully!!!", data:null});
    }
    });
 },
 create: function(req, res, next) {
  // let moviesList = [];
  // console.log(req.body)
  let subAssemblyData = req.body
  subAssemblyModel.create( subAssemblyData, function (err, result) {
    if (err){
      if(err.code == 11000)
        res.json({status:"error",message:"Duplicate Entry",data:err})
      else
        res.json({status:"error",message:"Something is wrong",data:err})
    }
     
    else
     res.json({status: "success", message: "New subAssembly added successfully!!!", data: null});
    
  });

 },

 deleteById: function(req, res, next) {
  subAssemblyModel.findByIdAndRemove(req.params.subAssemblyId, function(err, subAssemblyList){
   if(err)
    next(err);
   else {
    res.json({status:"success", message: "subAssembly deleted successfully!!!", data:null});
   }
  });
 },
}