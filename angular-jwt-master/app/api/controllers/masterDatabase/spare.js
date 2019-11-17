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
 create: function(req, res, next) {
  // let moviesList = [];
  // console.log(req.body)
  let spareData = req.body
  spareModel.create( spareData, function (err, result) {
    if (err)
     res.json({status:"error",message:"Something is wrong",data:err})
    else
     res.json({status: "success", message: "New Spare added successfully!!!", data: null});
    
  });

 },
}