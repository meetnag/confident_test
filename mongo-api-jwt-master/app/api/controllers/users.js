const userModel = require('../models/users');
const userRoleModel = require('../models/userRole');

const userLoggedModel = require('..//models/userLogged');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const saltRounds =10 ;

module.exports = {
 create: function(req, res, next) {
  userModel.create({ name: req.body.name, email: req.body.email, password: req.body.password ,RoleId:req.body.RoleId,branchId : req.body.branchId}, function (err, result) {
      if (err)
       res.json({status:"error",message:"Something is wrong",data:err})
      else
       res.json({status: "success", message: "New User added successfully!!!", data: null});
      
    });
 },

 update: function(req, res, next) {

   let update = req.body;
   if( req.body.password){
      
      update.password = bcrypt.hashSync(req.body.password, saltRounds)

   }
   userModel.findOneAndUpdate({"name":req.body.name},update, function (err, result) {
       if (err)
        res.json({status:"error",message:"User Not Found",data:err})
       else
        res.json({status: "success", message: "User Updated successfully!!!", data: null});
       
     });
  },

login: function(req, res, next) {

         let userEmail = req.body.email
         userModel.findOne({email:userEmail}, function(err, userInfo){
            if (err) {
            next(err);
            } else if(userInfo) {
              
               if(bcrypt.compareSync(req.body.password, userInfo.password)) {
                  // console.log("headers",req.headers['user-agent'])
                  userLoggedModel.remove({userEmail:userEmail },function(err,result){
                     let userLogged = new userLoggedModel ({
                        userEmail: userEmail ,
                        deviceId : req.headers['user-agent'],
                        loggedInTime:Date()
                     });
                     userLogged.save(function(err,result) {
                        if (err)
                           res.json({status:"error",message:"something looks wrong!!!",data:err});
                     }); 
                  })

                  const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' });
                  delete userInfo["password"]
                  let userI = userInfo;
                  let roleName ;
                  delete userI
                  let branchName;
                  userInformation = userInfo;
                  // console.log(userInfo.RoleId)
                  userRoleModel.findOne({_id:userInfo.RoleId},function(err,result){
                     if(result){
                        roleName=result.RoleName;
                        res.json({status:"success", message: "Login Successfully!!!", data:{user: userInfo, token:token,userRole :roleName,branchName:branchName}});
                     }
                     else
                        res.json({status:"error", message: "Login Successfully!!!", data:err});
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