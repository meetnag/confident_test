const express = require('express');
const router = express.Router();
const dashboardController = require('../app/api/controllers/dashboard');

router.post('/', dashboardController.getList);
/**
        * @api {post} dashboard/ get dashboard OC List
        * @apiVersion 0.0.1
        * @apiGroup dashboard List
        *
        * @apiParam {String} roleName to get OC List. (Should pass as a body parameter.- required)
        * @apiParam {String} branchId for branch group user. (Should pass as a body parameter. - if branch user then required otherwise optional)
        * @apiParam {String} fromDate to filter OC List. (Should pass as a body parameter. - optional) 
        * @apiParam {String} toDate to filter OC List. (Should pass as a body parameter. - optional) 
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

module.exports = router;