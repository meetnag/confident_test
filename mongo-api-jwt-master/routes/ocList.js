const express = require('express');
const router = express.Router();
const ocListController = require('../app/api/controllers/ocList');

router.get('/checkOCNumber/:OCNumber', ocListController.checkForOcNumber);
/**
        * @api {post} ocList/checkOCNumber check for duplicate oc Number
        * @apiVersion 0.0.1
        * @apiGroup OC List
        *
        * @apiParam {String} OcNumber to check for duplicate Oc Number. (Should pass as a URL parameter.- required)
        *
        * @apiSuccessExample {json} Success-Response:
        *{
        "status": "success",
        "message": "Unique OC Number",
        "data": "OCNumber"
        *}
        *
        * @apiErrorExample {json} Error-Response:
        *
        *{
        "status": "error",
        "message": "Provided OC number is already in use, please enter a new OC number",
        "data": null
        }
        */

router.post('/getCustomersByName', ocListController.getCustomerByName);
/**
        * @api {post} ocList/getCustomersByName get customers List
        * @apiVersion 0.0.1
        * @apiGroup OC List
        *
        * @apiParam {String} customerName to get customers List. (Should pass as a body parameter.- required)
        *
        * @apiSuccessExample {json} Success-Response:
        *{
        "status": "success",
        "message": "Records Found!!!",
        "data": [
            {
                "_id":"string",
                "name":"string",
                "address":"string",
                "contactNumber":"string",
                "city":"string",
                "state":"string",
                "zip":"int",
                "country":"string"
            }
        ]
        *}
        *
        * @apiErrorExample {json} Error-Response:
        *
        * {
        "status": "error",
        "message": "No Records found",
        "data": null
        }
        */
router.get('/getOcNumber', ocListController.getOcNumber);
/**
        * @api {get} ocList/getOcNumber get OC Number
        * @apiVersion 0.0.1
        * @apiGroup OC List
        *
        * @apiSuccessExample {json} Success-Response:
        *{
        "status": "success",
        "message": "OC Number fetched!!!",
        "data": {
            "OCNumber": "Number"
        }
        *}
        *
        */
router.post('/getOCArchieves',ocListController.getClosedOCs);
/**
        * @api {post} ocList/getOCArchieves get Closed OC List
        * @apiVersion 0.0.1
        * @apiGroup OC List
        *
        * @apiParam {String} roleName to get OC List. (Should pass as a body parameter.- required)
        * @apiParam {String} branchId for branch group user. (Should pass as a body parameter. - if branch then required otherwise optional)
        * @apiParam {String} Priority for Oc List. (Should pass as a body parameter. - optional)
        * @apiParam {String} typeOfSale to filter OC List. (Should pass as a body parameter. - optional) 
        * 
        * @apiSuccessExample {json} Success-Response:
        *{
        "status": "success",
        "message": "OC List Found!!!",
        "data": {
                "_id": "String",
                "OCNumber": "Number",
                "SubAssemblyIDs": [
                    {
                        "_id": "String",
                        "code":"String",
                        "name": "String"
                    }
                ],
                "SpareIDs":[
                    {
                        "_id": "5d57f8bd4a56a74071c4824d",
                        "code":"String",
                        "name": "testing1"
                    }
                ],
                "SerialNumbers":[
                    {
                        "name":"String",
                        "srno":"String"
                    }
                ],
                "OCDate" :"Date",
                "OCNotes":"String",
                "Priority":{
                    "_id":"String",
                    "name":"String"
                },
                "CustomerType":{
                    "_id":"String",
                    "name":"String"
                },
                "Customer":{
                    "_id":"String",
                    "name":"String",
                    "city":"String",
                    "contactNumber":"String"
                },
                "BranchID":{
                    "_id":"String",
                    "name":"String"
                },
                "ProductID":{
                    "_id":"String",
                    "code":"String",
                    "name":"String"
                },
                "Status":{
                    "_id":"String",
                    "name":"String"
                },
                "CreatedBy":"String",
                "CreatedDate":"Date",
                "UpdatedBy":"String",
                "UpdatedDate":"Date",
                "__v": 0
            },
        *}
        *
        @apiErrorExample {json} Error-Response:
        *
        * {
        "status": "error",
        "message": "Not found",
        "data": null
        }
        */

router.post('/updateStatus',ocListController.updateStatus);
/**
        * @api {post} ocList/updateStatus update OC status
        * @apiVersion 0.0.1
        * @apiGroup OC List
        *
        * @apiParam {String} ocId Oc Id to update oc .(Oc ID should be pass as a body parameter - required )
        * @apiParam {String} userName Name of user.(User Name should be pass as a body parameter -required)       
        * @apiParam {String} roleName roleName should be pass as a body parameter-required.
        * @apiParam {String} status status of current OC. Status should be pass as a body parameter - required.
        * @apiParam {String} branchName branch Name  should pass as a body parameter.
        * 
        * @apiSuccessExample {json} Success-Response:
        *{
        "status": "success",
        "message": "OC Status Updated successfully!!!",
        "data": null
        *}
        *
        @apiErrorExample {json} Error-Response:
        *
        * {
        "status": "error",
        "message": "Invalid OC ID!",
        "data": null
        }
        */
router.post('/create', ocListController.create);
/**
        * @api {post} ocList/create create new oc List
        * @apiVersion 0.0.1
        * @apiGroup OC List
        *
        * @apiParam {Date} OCDate Oc Date should be pass as a body parameter.
        * @apiParam {String} OCNotes Oc Notes should be pass as a body parameter.
        * @apiParam {String} Priority Priority is an object(Possible Values:HIGH,MEDIUM,LOW).( Field -_id:String , name :String.) 
        * @apiParam {String} CustomerType Customer Type is an object(Possible Values:Customer,Corporate,Government).( Field -_id:String , name :String.)
        * @apiParam {String} Customer Customer is an object(Field - name : String , city : String,contactNumber:String).
        * @apiParam {String} BranchID branch Ids is an object ( Field -_id:String , name :String.)
        * @apiParam {String} ProductID product Ids is an object ( Field - _id:String ,name :String.)
        * @apiParam {String} SubAssemblyIDs branch Ids is an array of objects ( Field -_id:String , name :String.)
        * @apiParam {String} SpareIDs spare Ids is an object ( Field - _id:String ,name :String.)
        * @apiParam {String} Installation installtion is an object.(Field - installationDate:Date,installationComplete:boolean,installationCompleteDate:Date,invoiceDate:Date,installationTechnician:String,technicianContact:String,transport:String,invoiceNumber:String)
        * @apiParam {String} Status Status is an object ( Field - name :String.)
        * @apiParam {String} CreatedBy created by (person who created the list)
        * @apiParam {String} UpdatedBy updated by ( person name who updated the list)
        * @apiParam {Date} CreatedDate creation date
        * @apiParam {Date} UpdatedDate updated date
        * @apiParam {String} SerialNumbers serial numbers is an array of objects ( Field - ID:Number ,name : String, srno : String)
        * @apiParam {String} StatusLog StatusLog of OC .(Field - UserName:String,PreviousStatus:String,ChangedStatus:String,Date:Date,AssignTo:String)
        *
        * @apiSuccessExample {json} Success-Response:
        *{
        "status": "success",
        "message": "OC List created successfully!!!",
        "data": null
        *}
        *
        @apiErrorExample {json} Error-Response:
        *
        * {
        "status": "error",
        "message": "Oc List Already Exist!!",
        "data": null
        }
        */
router.post('/getByOCNumber', ocListController.getByOCNumber);
/**
        * @api {post} ocList/getByOCNumber get oc by OC Number
        * @apiVersion 0.0.1
        * @apiGroup OC List
        *
        * @apiParam {Number} OCNumber to get OC. (Should pass as a body parameter. - required)
        * @apiParam {String} roleName role Name to get OC. (Should pass as a body parameter. - required)
        * @apiParam {String} branchId branch Id to get OC. (Should pass as a body parameter. - required only if branch user)
        
        * @apiSuccessExample {json} Success-Response:
        *{
        "status": "success",
        "message": "OC List Found!!!",
        "data": {
                "_id": "String",
                "OCNumber": "Number",
                "SubAssemblyIDs": [
                    {
                        "_id": "String",
                        "code":"String",
                        "name": "String"
                    }
                ],
                "SpareIDs":[
                    {
                        "_id": "5d57f8bd4a56a74071c4824d",
                        "code":"String",
                        "name": "testing1"
                    }
                ],
                "SerialNumbers":[
                    {
                        "name":"String",
                        "srno":"String"
                    }
                ],
                "OCDate" :"Date",
                "OCNotes":"String",
                "Priority":{
                    "_id":"String",
                    "name":"String"
                },
                "CustomerType":{
                    "_id":"String",
                    "name":"String"
                },
                "Customer":{
                    "_id":"String",
                    "name":"String",
                    "city":"String",
                    "contactNumber":"String"
                },
                "BranchID":{
                    "_id":"String",
                    "name":"String"
                },
                "ProductID":{
                    "_id":"String",
                    "code":"String",
                    "name":"String"
                },
                "installation":{
                    "_id":"String",
                    "installationDate":Date",
                    "installationComplete":"String",
                    "invoiceDate":"Date",
                    "InstallationTechnician":"String",
                    "technicianContact":"String",
                    "transport":"String",
                    "invoiceNumber":"String"
                }
                "Status":{
                    "_id":"String",
                    "name":"String"
                },
                "CreatedBy":"String",
                "CreatedDate":"Date",
                "UpdatedBy":"String",
                "UpdatedDate":"Date",
                "__v": 0
            },
        *}
        *
        @apiErrorExample {json} Error-Response:
        *
        * {
        "status": "error",
        "message": "Not found",
        "data": null
        }
        */
router.post('/',ocListController.getByRoleName);
/**
        * @api {post} ocList/ get OC List
        * @apiVersion 0.0.1
        * @apiGroup OC List
        *
        * @apiParam {String} roleName to get OC List. (Should pass as a body parameter.- required)
        * @apiParam {String} Priority to filter OC List. (Should pass as a body parameter. - optional)
        * @apiParam {String} branchId for branch group user. (Should pass as a body parameter. - if branch user then required otherwise optional)
        * @apiParam {String} typeOfSale to filter OC List. (Should pass as a body parameter. - optional) 
        * @apiSuccessExample {json} Success-Response:
        *{
        "status": "success",
        "message": "OC List Found!!!",
        "data": {
                "_id": "String",
                "OCNumber": "Number",
                "SubAssemblyIDs": [
                    {
                        "_id": "String",
                        "code":"String",
                        "name": "String"
                    }
                ],
                "SpareIDs":[
                    {
                        "_id": "5d57f8bd4a56a74071c4824d",
                        "code":"String",
                        "name": "testing1"
                    }
                ],
                "SerialNumbers":[
                    {
                        "name":"String",
                        "srno":"String"
                    }
                ],
                "OCDate" :"Date",
                "OCNotes":"String",
                "Priority":{
                    "_id":"String",
                    "name":"String"
                },
                "CustomerType":{
                    "_id":"String",
                    "name":"String"
                },
                "Customer":{
                    "_id":"String",
                    "name":"String",
                    "city":"String",
                    "zip":"String",
                    "landlineNumber":"String",
                    "contactNumber":"String"
                },
                "BranchID":{
                    "_id":"String",
                    "name":"String"
                },
                "ProductID":{
                    "_id":"String",
                    "code":"String",
                    "name":"String"
                },
                Installation:{
                    "installationDate":"Date",
                    "installationComplete":"Boolean"
                    "installationCompleteDate":"Date"
                    "invoiceDate":"Date",
                    "installationTechnician":"String",
                    "technicianContact":"String",
                    "transport":"String",
                    "invoiceNumber":"String",
                },
                "Status":{
                    "_id":"String",
                    "name":"String"
                },
                "CreatedBy":"String",
                "CreatedDate":"Date",
                "UpdatedBy":"String",
                "UpdatedDate":"Date",
                "StatusLog":{
                    "_id":"String",
                    "UserName":"String",
                    "PreviousStatus":"String",
                    "ChangedStatus":"String",
                    "Date":"Date"
                    "AssignTo":"String"
                }
                "__v": 0
            },
        *}
        *
        @apiErrorExample {json} Error-Response:
        *
        * {
        "status": "error",
        "message": "No OC List found",
        "data": null
        }
        */

router.post('/updateByOCId',ocListController.updateOC);
/**
        * @api {post} ocList/updateByOCId update oc List by OC ID
        * @apiVersion 0.0.1
        * @apiGroup OC List
        *
        * @apiParam {String} _id id to update OC. (Should pass as a Body parameter.-required)
        * @apiParam {String} roleName roleName of user.(Role Name should be pass as a body parameter -required)
        * @apiParam {String} userName Name of user.(User Name should be pass as a body parameter -required)
        * @apiParam {String} status Status of OC.(Satus should be pass as a body parameter -required)
        * @apiParam {Date} OCDate Oc Date should be pass as a body parameter.
        * @apiParam {String} OCNotes Oc Notes should be pass as a body parameter.
        * @apiParam {String} Priority Priority is an object(Possible Values:HIGH,MEDIUM,LOW). 
        * @apiParam {String} CustomerType Customer Type is an object(Possible Values:Customer,Corporate,Government).
        * @apiParam {String} Customer Customer is an object(Field - name : String , city : String,contactNumber:String).
        * @apiParam {String} BranchID branch Ids is an object ( Field - name :String.)
        * @apiParam {String} ProductID product Ids is an object ( Field - name :String.)
        * @apiParam {String} SubAssemblyIDs branch Ids is an array of objects ( Field - name :String.)
        * @apiParam {String} SpareIDs spare Ids is an object ( Field - name :String.)
        * @apiParam {String} Status Status is an object ( Field - name :String.)
        * @apiParam {String} CreatedBy created by (person who created the list)
        * @apiParam {String} UpdatedBy updated by ( person name who updated the list)
        * @apiParam {Date} CreatedDate creation date
        * @apiParam {Date} UpdatedDate updated date
        * @apiParam {String} SerialNumbers serial numbers is an array of objects ( Field - name : String, srno : String)
       
        * @apiSuccessExample {json} Success-Response:
        *{
        "status": "success",
        "message": "OC Updated Successfully!!!",
        "data": null
        *
        @apiErrorExample {json} Error-Response:
        *
        * {
        "status": "error",
        "message": "Not found",
        "data": null
        }
        */

       router.post('/ocSearch', ocListController.ocSearch);

module.exports = router;