const express = require('express');
const router = express.Router();
const productController = require('../../app/api/controllers/masterDatabase/product');
router.post('/create', productController.create);
/**
        * @api {post} products/create create product
        * @apiVersion 0.0.1
        * @apiGroup masterDatabase
        *
        * @apiParam {String} name name of priority .(name should be pass as a body Parameter - required)
        * @apiParam {String} code code of priority .(code should be pass as a body Parameter - required)
        *
        * @apiSuccessExample {json} Success-Response:
        *{
        "status": "success",
        "message": "product Created Successfully!!!",
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
router.get('/', productController.getAll);
/**
        * @api {get} products/ get product list
        * @apiVersion 0.0.1
        * @apiGroup masterDatabase
        *
        * @apiSuccessExample {json} Success-Response:
        *{
        "status": "success",
        "message": "Product list Fetched!!!",
        "data": {
                "productList":[
                        {
                                "_id":"string",
                                "code":"string",
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