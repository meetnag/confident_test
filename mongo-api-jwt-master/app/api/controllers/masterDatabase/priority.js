const priorityModel = require('../../models/masterDatabase/priority');
module.exports = {

getAll: function(req, res, next) {
  // let moviesList = [];
  priorityModel.find({}, function(err, priorityList){
   if (err){
    next(err);
   } else{
    res.json({status:"success", message: "Product Ids list Fetched!!!", data:{priorityList: priorityList}});
       
   }
});
 },
 create: function(req, res, next) {
  let priorityData = req.body
  priorityModel.create( priorityData, function (err, result) {
    if (err)
     res.json({status:"error",message:"Something is wrong",data:err})
    else
     res.json({status: "success", message: "New Priority added successfully!!!", data: null});
    
  });

 },
}