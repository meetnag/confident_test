const express = require('express');
const router = express.Router();
const userController = require('../app/api/controllers/users');
router.get('/', userController.getAll);

router.post('/register', userController.create);
/**
        * @api {post} users/register register
        * @apiVersion 0.0.1
        * @apiGroup user
        *
        * @apiParam {String} name name to register.(name id should be pass as a body parameter - required)
        * @apiParam {String} password Password for login.(password  should be pass as a body parameter - required)
        * @apiParam {String} email email to register.(Email should be pass as a body parameter - required)
        * @apiParam {String} RoleId to assign role to user.(role Id should be pass as a body parameter - required)
        * @apiParam {String} branchId to assign role to user.(Branch Id should be pass as a body parameter - required only if branch user)
        * 
        * @apiSuccessExample {json} Success-Response:
        *{
        "status": "success",
        "message": "New User added successfully!!!",
        "data": null
        *}
        *
        @apiErrorExample {json} Error-Response:
        *
        * {
        "status": "error",
        "message": "Something is wrong",
        "data": null
        }
        */
router.post('/login', userController.login);
/**
        * @api {post} users/login login
        * @apiVersion 0.0.1
        * @apiGroup user
        *
        * @apiParam {String} email Email id for login.( email id should be pass as a body parameter)
        * @apiParam {String} password Password for login.( password should be pass as a body parameter)
        *
        * @apiSuccessExample {json} Success-Response:
        *{
        "status": "success",
        "message": "user found!!!",
        "data": {
            "user": {
                "_id": "string"",
                "name": "string",
                "email": "string",
                "password": "string",
                "__v": "number"
                },
            "token": "string",
            "userRole":"String"                
        }

        *}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "status": "error",
	    "message": "Invalid email/password!!!",
	    "data": null
	   }
	 */
    router.post('/', userController.getAll);
/**
        * @api {post} users/ get all users
        * @apiVersion 0.0.1
        * @apiGroup user
        *
        *
        * @apiSuccessExample {json} Success-Response:
        *{
        "status": "success",
        "message": "user list found!!!",
        "data": {
            "user": {
                "_id": "string"",
                "name": "string",
                "email": "string",
                "password": "string",
                "__v": "number"
                },
            "token": "string",
            "userRole":"String"                
        }

        *}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "status": "error",
	    "message": "Invalid email/password!!!",
	    "data": null
	   }
	 */
module.exports = router;