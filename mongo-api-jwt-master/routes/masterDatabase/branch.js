const express = require('express');
const router = express.Router();
const branchController = require('../../app/api/controllers/masterDatabase/branch');
router.post('/create', branchController.create);
/**
        * @api {get} branch/create create branch
        * @apiVersion 0.0.1
        * @apiGroup masterDatabase
        *
        * @apiSuccessExample {json} Success-Response:
        *{
        "status": "success",
        "message": "Branch Created Successfully!!!",
        "data": null
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
router.get('/', branchController.getAll);
/**
        * @api {get} branch/ get branch list
        * @apiVersion 0.0.1
        * @apiGroup masterDatabase
        *
        * @apiSuccessExample {json} Success-Response:
        *{
        "status": "success",
        "message": "Branch list Fetched!!!",
        "data": {
                "branchList":[
                        {
                                "_id":"string",
                                "name":"string",
                                "address":"string",
                                "contactName":"string,"
                                "contactNumber":"string",
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