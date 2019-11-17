const branchModel = require('../../models/masterDatabase/branch');
module.exports = {

getAll: function(req, res, next) {
  // let moviesList = [];
  branchModel.find({}, function(err, branchList){
   if (err){
    next(err);
   } else{
    res.json({status:"success", message: "Branch list Fetched!!!", data:{branchList: branchList}});
       
   }
});
 },
 create: function(req, res, next) {
  // let moviesList = [];
  console.log(req.body)
  branchBody = req.body
  branchModel.create( branchBody, function (err, result) {
    if (err)
     res.json({status:"error",message:"Something is wrong",data:err})
    else
     res.json({status: "success", message: "New Branch added successfully!!!", data: null});
    
  });

 },
 
}