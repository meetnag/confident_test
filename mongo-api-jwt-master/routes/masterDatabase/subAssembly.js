const express = require('express');
const router = express.Router();
const subAssemblyController = require('../../app/api/controllers/masterDatabase/subAssembly');
router.post('/create', subAssemblyController.create);
/**
        * @api {post} subAssembly/create create subAssembly
        * @apiVersion 0.0.1
        * @apiGroup masterDatabase
        *
        * @apiParam {String} name name of sub Assembly .(name should be pass as a body Parameter - required)
        * @apiParam {String} code code of sub Assembly .(code should be pass as a body Parameter - required)
        *
        * @apiSuccessExample {json} Success-Response:
        *{
        "status": "success",
        "message": "subAssembly Created Successfully!!!",
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
router.get('/', subAssemblyController.getAll);
/**
        * @api {get} subAssembly/ get SubAssembly list
        * @apiVersion 0.0.1
        * @apiGroup masterDatabase
        *
        * @apiSuccessExample {json} Success-Response:
        *{
        "status": "success",
        "message": "SubAssembly list Fetched!!!",
        "data": {
                "subAssemblyList":[
                        {
                                "_id":"string",
                                "name":"string",
                                "code":"string"
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
//        router.post('/p', subAssemblyController.create);

module.exports = router;