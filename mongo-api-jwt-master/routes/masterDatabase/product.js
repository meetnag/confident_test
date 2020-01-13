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

router.post('/update', productController.updateById);
/**
        * @api {post} products/update update product
        * @apiVersion 0.0.1
        * @apiGroup masterDatabase
        *
        * @apiParam {String} productId objectId of product .(id should be pass as a body Parameter - required)
        * @apiParam {String} name name of product .(name should be pass as a body Parameter - required)
        * @apiParam {String} code code of product .(code should be pass as a body Parameter - required)
        * 
        * @apiSuccessExample {json} Success-Response:
        *{
        "status": "success",
        "message": "Product updated successfully!!!",
        "data": null
        *}
        *
        @apiErrorExample {json} Error-Response:
        *
        * {
        "status": "error",
        "message": "Something looks wrong",
        "data": errorObject
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

        
router.post('/deleteById/:productId', productController.deleteById);
/**
        * @api {post} products/deleteById delete product 
        * @apiVersion 0.0.1
        * @apiGroup masterDatabase
        *
        * @apiSuccessExample {json} Success-Response:
        *{
        "status": "success",
        "message": "Product deleted successfully!!!",
        "data": null
        *}
        *
        @apiErrorExample {json} Error-Response:
        *
        * {
        "status": "error",
        "message": "Something looks wrong",
        "data": errorObject
        }
        */

module.exports = router;