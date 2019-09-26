const stateModel = require('../../models/masterDatabase/state');
module.exports = {

getAll: function(req, res, next) {
  // let moviesList = [];
  stateModel.find({}, function(err, stateList){
   if (err){
    next(err);
   } else{
    res.json({status:"success", message: "State List Fetched!!!", data:{stateList: stateList}});
       
   }
});
 },

 create: function(req, res, next) {
  let stateList = req.body
  // console.log(stateList)
  stateModel.create( stateList, function (err, result) {
    if (err)
     res.json({status:"error",message:"Something is wrong",data:err})
    else
     res.json({status: "success", message: "New State added successfully!!!", data: null});
  });
 },
 
}