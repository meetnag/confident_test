const express = require('express');
const router = express.Router();
const branchController = require('../../app/api/controllers/masterDatabase/branch');
router.post('/create', branchController.create);
/**
        * @api {post} branch/create create branch
        * @apiVersion 0.0.1
        * @apiGroup masterDatabase
        *
        * @apiParam {String} name name of branch .(name should be pass as a body Parameter - required)
        * @apiParam {String} address address of branch .(address should be pass as a body Parameter)
        * @apiParam {String} contactName contactName of branch .(contactName should be pass as a body Parameter)
        * @apiParam {String} contactNumber contact Number of branch .(contactNumber should be pass as a body Parameter)
        * @apiParam {String} country country of branch .(country name should be pass as a body Parameter)
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