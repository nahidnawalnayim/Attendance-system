const router=require('express').Router();
const {loginRoute,registerRoute} = require('../controller/auth')
router.post("/register",registerRoute);
router.post("/login",loginRoute);

module.exports =router