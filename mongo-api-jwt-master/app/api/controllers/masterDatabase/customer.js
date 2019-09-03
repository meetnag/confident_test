const customerModel = require('../../models/masterDatabase/customer');
module.exports = {

getAll: function(req, res, next) {
  // let moviesList = [];
  customerModel.find({}, function(err, customerList){
   if (err){
    next(err);
   } else{
    res.json({status:"success", message: "Customer list Fetched!!!", data:{customerList: customerList}});
   }
});
 },
 
}