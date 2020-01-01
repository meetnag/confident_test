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
router.post('/update', subAssemblyController.updateById);
/**
        * @api {post} subAssembly/update update sub Assembly
        * @apiVersion 0.0.1
        * @apiGroup masterDatabase
        *
        * @apiParam {String} subAssemblyId objectId of subAssembly .(id should be pass as a body Parameter - required)
        * @apiParam {String} name name of subAssembly .(name should be pass as a body Parameter - required)
        * @apiParam {String} code code of subAssembly .(code should be pass as a body Parameter - required)
        * 
        * @apiSuccessExample {json} Success-Response:
        *{
        "status": "success",
        "message": "subAssembly updated successfully!!!",
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

              
router.post('/deleteById/:subAssemblyId', subAssemblyController.deleteById);
/**
        * @api {post} subAssembly/ delete subAssembly 
        * @apiVersion 0.0.1
        * @apiGroup masterDatabase
        *
        * @apiSuccessExample {json} Success-Response:
        *{
        "status": "success",
        "message": "subAssembly deleted successfully!!!",
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