const express = require('express');
const router = express.Router();
const userRoleController = require('../app/api/controllers/userRole');
router.post('/create', userRoleController.create);
/**
        * @api {post} userRole/create create new User Role
        * @apiVersion 0.0.1
        * @apiGroup User Role
        *
        * @apiParam {String} roleName to create new role.(role Name should be pass as a body parameter - required)
        * 
        * @apiSuccessExample {json} Success-Response:
        *{
        "status": "success",
        "message": "User Role created successfully!!!",
        "data": null
        *}
        *
        @apiErrorExample {json} Error-Response:
        *
        * {
        "status": "error",
        "message": "Role Name already Exist!!!",
        "data": null
        }
        */
router.get('/', userRoleController.fetchAll);
/**
        * @api {get} userRole/ get User Role list
        * @apiVersion 0.0.1
        * @apiGroup User Role
        *
        * @apiSuccessExample {json} Success-Response:
        *{
        "status": "success",
        "message": "user Role List fetched!!!",
        "data": {
            "userRole": {
                "_id": "string"",
                "RoleName": "string",
                "__v": "number"
                },
            }
        *}
        *}
        *
        @apiErrorExample {json} Error-Response:
        *
        * {
        "status": "error",
        "message": "Not Found",
        "data": null
        }
        */
module.exports = router;