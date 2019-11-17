const countryModel = require('../../models/masterDatabase/country');
module.exports = {

getAll: function(req, res, next) {
  // let moviesList = [];
  countryModel.find({}, function(err, countryList){
   if (err){
    next(err);
   } else{
    res.json({status:"success", message: "country List Fetched!!!", data:{countryList: countryList}});
       
   }
});
 },

 create: function(req, res, next) {
  let countryList = req.body
  // console.log(stateList)
  countryModel.create( countryList, function (err, result) {
    if (err)
     res.json({status:"error",message:"Something is wrong",data:err})
    else
     res.json({status: "success", message: "New Country added successfully!!!", data: null});
  });
 },
 
}