const express= require('express')
const router=express()
const userController= require('../controller/index')
const momentsController= require('../controller/moment')
const {upload}= require('../middleware/upload')


//routes for Dish crude
router.post('/api/createuserdetails', userController.createUserDetails)
router.post('/api/signin', userController.signin)
router.get('/api/getuserList', userController.getUserList)
router.get('/api/getUserDetails/:id', userController.getUserDetails)
router.put('/api/editUserDetails/:id', userController.editUserDetails)
router.get('/api/deleteUserDetails/:id', userController.deleteUser)


//routes for Moments crude
router.post('/api/createMoments', upload.single('document'), momentsController.createMoments)
router.get('/api/getmomentsList', momentsController.getmomentsList)
router.get('/api/getMomentDetails/:id', momentsController.getMomentDetails)
router.put('/api/editMomentDetails/:id', momentsController.editMomentDetails)
router.get('/api/deleteMoments/:id', momentsController.deleteMoments)


module.exports = router;