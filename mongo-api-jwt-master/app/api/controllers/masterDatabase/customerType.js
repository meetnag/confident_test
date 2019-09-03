const customerTypeModel = require('../../models/masterDatabase/customerType');
module.exports = {

getAll: function(req, res, next) {
  // let moviesList = [];
  customerTypeModel.find({}, function(err, customerTypeList){
   if (err){
    next(err);
   } else{
    res.json({status:"success", message: "customerType list Fetched!!!", data:{customerTypeList: customerTypeList}});
       
   }

});
 },
 create: function(req, res, next) {
  // let moviesList = [];
  console.log(req.body)
  let customerType = req.body
  customerTypeModel.create( customerType, function (err, result) {
    if (err)
     res.json({status:"error",message:"Something is wrong",data:err})
    else
     res.json({status: "success", message: "New customerType added successfully!!!", data: null});
    
  });

 },
}