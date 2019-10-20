const express = require('express');
const router = express.Router();
const ocListController = require('../app/api/controllers/ocList');

router.get('/modbusHMI', ocListController.modbusHMI);
router.post('/addModbusHMI', ocListController.modbusAddd);
router.post('/updateModbusCon', ocListController.updateModbusConsolidated)
router.post('/addModbusCon', ocListController.addModbusConsolidated)
router.post('/modbusGet', ocListController.modbusConsolidatedGetAll);

router.post('/addLocalModbus', ocListController.addLocalModbus);
router.post('/updateLocalModbus', ocListController.updateLocalModbus);
router.get('/getLocalModbus', ocListController.getLocalModbus);
router.get('/getRawMaterial', ocListController.getRawMaterial);
router.get('/getHMIRawMaterial', ocListController.getHMIRawMaterial);
router.post('/addRawMaterial', ocListController.addRawMaterial);
router.post('/updateRawMaterial', ocListController.updateStatusOfRawMaterial);
router.get('/getProgramStatus', ocListController.getStatus);
router.get('/getProgramData', ocListController.getProgramData);

router.get('/processStepyOneArray', ocListController.processStepyOneArray);
router.get('/processStepyByObject', ocListController.processStepyByObject);

router.post('/getByOCNumber', ocListController.getScanOcNumber);

/**
        * @api {post} scanOcList/getByOCNumber get scanned oc by OC Number
        * @apiVersion 0.0.1
        * @apiGroup OC List
        *
        * @apiParam {Number} OCNumber to get OC. (Should pass as a body parameter. - required)
        
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

module.exports = router;