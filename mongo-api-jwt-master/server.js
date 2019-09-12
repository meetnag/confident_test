const express = require('express');
const movies = require('./routes/movies') ;
const users = require('./routes/users');
const userRole= require('./routes/userRole') ;
const ocList= require('./routes/ocList') ;

const scanOcNumber= require('./routes/scanOcNumber') ;
const subAssemblyList= require('./routes/masterDatabase/subAssembly') ;
const ocDocument= require('./routes/ocDocument') ;
const customerList= require('./routes/masterDatabase/customer') ;
const branchList= require('./routes/masterDatabase/branch') ;
const priorityList= require('./routes/masterDatabase/priority') ;
const customerTypeList= require('./routes/masterDatabase/customerType') ;
const spareList= require('./routes/masterDatabase/spare') ;
const products= require('./routes/masterDatabase/product') ;
const bodyParser = require('body-parser');
const userLoggedModel = require('./app/api/models/userLogged');
var morgan = require('morgan')
var winston = require('./config/winston');

global.mongoose = require('./config/database'); //database configuration

var jwt = require('jsonwebtoken');
const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.set('secretKey', 'nodeRestApi'); // jwt secret token

// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res){
  res.json({"tutorial" : "Build REST API with node.js"});
});

// for cross origin
var cors = require('cors')
app.use(cors())

// for api documentation
app.use('/api', express.static(__dirname + '/apidoc/'));

// public route
app.use('/users', users);


// private route
app.use('/movies', movies);
app.use('/userRole',userRole);
app.use('/ocList',validateUser,ocList);
app.use('/scanOcList',scanOcNumber);
app.use('/branch',branchList);
app.use('/customer',customerList);
app.use('/customerType',customerTypeList);
app.use('/ocDocument',ocDocument);
app.use('/priority',priorityList);
app.use('/spare',spareList);
app.use('/subAssembly',subAssemblyList);
app.use('/products',products);

app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
});

function validateUser(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
    if (err) {
      res.status(401).send([{
        success:false,
        message:'Token is not valid'
      }]);
    }else{
        userLoggedModel.findOne({deviceId:req.headers['user-agent'] , userEmail:req.headers['x-auth-user']  },function(err,result){
          if(result){
            req.body.userId = decoded.id;
            next();
          }
          else{
            res.status(401).send([{
              success:false,
              message:'Token is not valid'
            }]);
          }
        })
        
    }
  });
}

// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function(req, res, next) {
 let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// handle errors
app.use(function(err, req, res, next) {

  // winston.error(req)
  // winston.error(` ${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
  if(err.status === 404)
   res.status(404).json({status:"error",message: "Not found",data:err});
  else 
    res.status(500).json({status:"error",message: "Something looks wrong :( !!!" , data:err});
});

app.listen(3000, function(){
 console.log('Node server listening on port 3000');
});