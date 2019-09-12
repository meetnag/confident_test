const express = require('express');
const router = express.Router();
const spareController = require('../../app/api/controllers/masterDatabase/spare');
router.post('/create', spareController.create);
/**
        * @api {post} spare/create create spare
        * @apiVersion 0.0.1
        * @apiGroup masterDatabase
        *
        * @apiParam {String} name name of spare .(name should be pass as a body Parameter - required)
        * @apiParam {String} code code of spare .(code should be pass as a body Parameter - required)
        *
        * @apiSuccessExample {json} Success-Response:
        *{
        "status": "success",
        "message": "spare Created Successfully!!!",
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
router.get('/', spareController.getAll);
/**
        * @api {get} spare/ get spare list
        * @apiVersion 0.0.1
        * @apiGroup masterDatabase
        *
        * @apiSuccessExample {json} Success-Response:
        *{
        "status": "success",
        "message": "Spare list Fetched!!!",
        "data": {
                "spareList":[
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

module.exports = router;