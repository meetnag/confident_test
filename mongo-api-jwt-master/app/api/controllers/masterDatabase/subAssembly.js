const subAssemblyModel = require('../../models/masterDatabase/subAssembly');
module.exports = {

getAll: function(req, res, next) {
  // let moviesList = [];
  subAssemblyModel.find({}, function(err, subAssemblyList){
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
    if (err)
     res.json({status:"error",message:"Something is wrong",data:err})
    else
     res.json({status: "success", message: "New subAssembly added successfully!!!", data: null});
    
  });

 },
}