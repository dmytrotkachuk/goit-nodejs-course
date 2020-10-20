const { Router } = require('express')
const UserController = require('./user.controller')
const router = Router()

router.get('/users/current', UserController.authorize, UserController.getCurrentUser)
router.post('/auth/register', UserController.validateUser, UserController.signUp)
router.put('/auth/login', UserController.validateUser, UserController.signIn)
router.put('/auth/logout', UserController.authorize, UserController.logout)
router.patch('/users', UserController.authorize, UserController.subscriptionUpdate)



module.exports = router