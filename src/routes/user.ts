const { Router } = require('express');
const router = new Router()

const userController = require('../controllers/userController');

//*  @desc   Register User 
//*  @route  POST /users/register
router.post("/register" , userController.createUser)


//*  @desc   Login User 
//*  @route  POST /users/login
router.post("/login" , userController.userLogin)


module.exports = router
export {}
