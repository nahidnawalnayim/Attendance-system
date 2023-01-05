const router=require('express').Router();
const authRoutes=require('./auth')
const userRoutes=require('./user')
const authmiddleware=require('../middleware/authenticate')

router.use('/api/v1/auth',authRoutes);
router.use('/api/v1/users',userRoutes);
router.use('/api/v1/users/:userId',userRoutes)

module.exports = router