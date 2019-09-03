const express = require('express');
const router = express.Router();
const priorityController = require('../../app/api/controllers/masterDatabase/priority');
router.post('/create', priorityController.create);
/**
        * @api {get} priority/create create priority
        * @apiVersion 0.0.1
        * @apiGroup masterDatabase
        *
        * @apiSuccessExample {json} Success-Response:
        *{
        "status": "success",
        "message": "priority Created Successfully!!!",
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
router.get('/', priorityController.getAll);
/**
        * @api {get} priority/ get priority list
        * @apiVersion 0.0.1
        * @apiGroup masterDatabase
        *
        * @apiSuccessExample {json} Success-Response:
        *{
        "status": "success",
        "message": "Priority list Fetched!!!",
        "data": {
                "priorityList":[
                        {
                                "_id":"string",
                                "name":"string"
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