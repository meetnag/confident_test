const userRoleModel = require('../models/userRole');
module.exports = {
 create: function(req, res, next) {
  console.log(req.body.roleName)
   userRoleModel.findOne({RoleName:req.body.roleName},function(err,result){
      if(err) 
         next(err)
      else if(result)
         res.json({status:"error",message:"Role Nadme already Exist!!!",data:null})
      else
      {
         userRoleModel.create({  RoleName: req.body.roleName }, function (err, result) {
            if (err) 
            next(err);
            else
            res.json({status: "success", message: "User Role created successfully!!!", data: null});     
         });
      }
   });
 },
fetchAll: function(req, res, next) {
   userRoleModel.find({},function(err, userRoleInfo){
     if (err) 
      next(err)
      else 
      res.json({status:"success", message: "user Role List fetched!!!", data:{userRole: userRoleInfo}});

     })
    },
}