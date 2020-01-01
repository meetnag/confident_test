const productModel = require('../../models/masterDatabase/product');
module.exports = {

getAll: function(req, res, next) {
  let moviesList = [];
  productModel.find({}, null, { sort: { "name": 1 } }, function(err, productList){
   if (err){
    next(err);
   } else{
    res.json({status:"success", message: "Product list Fetched!!!", data:{productList: productList}});
       
   }
});
 },

 updateById: function(req, res, next) {
  
  productModel.findByIdAndUpdate(req.body.productId,{name:req.body.name , code : req.body.code}, function(err, movieInfo){
  if(err)
      next(err);
    else {
      res.json({status:"success", message: "Product updated successfully!!!", data:null});
    }
    });
 },

 create: function(req, res, next) {
  let productData = req.body
  productModel.create( productData, function (err, result) {
    if (err){
      if(err.code == 11000)
        res.json({status:"error",message:"Duplicate Entry",data:err})
      else
        res.json({status:"error",message:"Something is wrong",data:err})
    }
    else
      res.json({status: "success", message: "New Product added successfully!!!", data: null});
    
  });

 },
 deleteById: function(req, res, next) {
  productModel.findByIdAndRemove(req.params.productId, function(err, productList){
   if(err)
    next(err);
   else {
    res.json({status:"success", message: "Product deleted successfully!!!", data:null});
   }
  });
 },
}