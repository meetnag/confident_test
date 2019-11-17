const express = require('express');
const router = express.Router();
const stateController = require('../../app/api/controllers/masterDatabase/state');

router.post('/create', stateController.create);
/**
        * @api {post} state/create create state
        * @apiVersion 0.0.1
        * @apiGroup masterDatabase
        *
        * @apiParam {String} name name of state .(name should be pass as a body Parameter - required)
        *
        * @apiSuccessExample {json} Success-Response:
        *{
        "status": "success",
        "message": "state Created Successfully!!!",
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

router.get('/', stateController.getAll);
/**
        * @api {get} state/ get state list
        * @apiVersion 0.0.1
        * @apiGroup masterDatabase
        *
        * @apiSuccessExample {json} Success-Response:
        *{
        "status": "success",
        "message": "State list Fetched!!!",
        "data": {
                "stateList":[
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

module.exports = router;