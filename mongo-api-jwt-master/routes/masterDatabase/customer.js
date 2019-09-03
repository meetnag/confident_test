const express = require('express');
const router = express.Router();
const customerController = require('../../app/api/controllers/masterDatabase/customer');
router.get('/', customerController.getAll);
/**
        * @api {get} customer/ get customer list
        * @apiVersion 0.0.1
        * @apiGroup masterDatabase
        *
        * @apiSuccessExample {json} Success-Response:
        *{
        "status": "success",
        "message": "Customer list Fetched!!!",
        "data": {
                "customerList":[
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
        }
        *}
        *
        @apiErrorExample {json} Error-Response:
        *
        * {
        "status": "error",
        "message": "not found",
        "data": null
        }
        */

module.exports = router;