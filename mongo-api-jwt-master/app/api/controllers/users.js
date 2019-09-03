const userModel = require('../models/users');
const userRoleModel = require('../models/userRole');
const branchModel = require('../models/masterDatabase/branch');

const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
module.exports = {
 create: function(req, res, next) {
  userModel.create({ name: req.body.name, email: req.body.email, password: req.body.password ,RoleId:req.body.RoleId,branchId : req.body.branchId}, function (err, result) {
      if (err)
       res.json({status:"error",message:"Something is wrong",data:err})
      else
       res.json({status: "success", message: "New User added successfully!!!", data: null});
      
    });
 },
login: function(req, res, next) {
         userModel.findOne({email:req.body.email}, function(err, userInfo){
            if (err) {
            next(err);
            } else if(userInfo) {
              
               if(bcrypt.compareSync(req.body.password, userInfo.password)) {
                  const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' });
                  delete userInfo["password"]
                  let userI = userInfo;
                  let roleName ;
                  delete userI
                  let branchName;
                  userInformation = userInfo;
                  console.log(userInfo.RoleId)
                  userRoleModel.findOne({_id:userInfo.RoleId},function(err,result){
                     if(result){
                        roleName=result.RoleName;
                        res.json({status:"success", message: "Login Successfully!!!", data:{user: userInfo, token:token,userRole :roleName,branchName:branchName}});
                        //       
                        // if (userInfo.branchId){
                        //    branchModel.findOne({_id:userInfo.branchId},function(err,result){
                        //       if(result){
                        //          branchName = result.name;
                        //          res.json({status:"success", message: "Login Successfully!!!", data:{user: userInfo, token:token,userRole :roleName,branchName:branchName}});
                        //       }
                        //       else
                        //          res.json({status:"error", message: "Something went wrong!!!", data:err}); 
                        //    });
                        // }else
                        //    res.json({status:"success", message: "Login Successfully!!!", data:{user: userInfo, token:token,userRole :roleName}});  
                     }
                     else
                        res.json({status:"error", message: "Login Successfully!!!", data:err});
                        //      
                  }); 
               }else
                  res.json({status:"error", message: "Invalid email/password!!!", data:null});
            }
            else
               res.json({status:"error", message: "Invalid email/password!!!", data:null});
    });
 },
 getAll: function(req, res, next) {
   userModel.find({},function(err, ocList){
     if (err) 
      next(err)
      else 
      res.json({status:"success", message: "user List fetched!!!", data:{ocList: ocList}});

     })
    },
}