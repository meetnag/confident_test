const productModel = require('../../models/masterDatabase/product');
module.exports = {

getAll: function(req, res, next) {
  let moviesList = [];
  productModel.find({}, function(err, productList){
   if (err){
    next(err);
   } else{
    res.json({status:"success", message: "Product list Fetched!!!", data:{productList: productList}});
       
   }
});
 },
 create: function(req, res, next) {
  // let moviesList = [];
  // console.log(req.body)
  let productData = req.body
  productModel.create( productData, function (err, result) {
    if (err)
     res.json({status:"error",message:"Something is wrong",data:err})
    else
     res.json({status: "success", message: "New Product added successfully!!!", data: null});
    
  });

 },
}