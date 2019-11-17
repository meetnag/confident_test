const express = require('express');
const router = express.Router();
const countryController = require('../../app/api/controllers/masterDatabase/country');

router.post('/create', countryController.create);
/**
        * @api {post} country/create create country
        * @apiVersion 0.0.1
        * @apiGroup masterDatabase
        *
        * @apiParam {String} name name of country .(name should be pass as a body Parameter - required)
        *
        * @apiSuccessExample {json} Success-Response:
        *{
        "status": "success",
        "message": "country Created Successfully!!!",
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

router.get('/', countryController.getAll);
/**
        * @api {get} country/ get country list
        * @apiVersion 0.0.1
        * @apiGroup masterDatabase
        *
        * @apiSuccessExample {json} Success-Response:
        *{
        "status": "success",
        "message": "Country list Fetched!!!",
        "data": {
                "countryList":[
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