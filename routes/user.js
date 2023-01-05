const router=require('express').Router();
const userController=require('../controller/user')

router.get('/:userId',userController.getUserbyID);

router.put('/:userId',userController.putUser);

router.patch('/:userId',userController.patchUser);

router.delete('/:userId',userController.deleteUser);

router.get('/',userController.getUsers);

router.post('/',userController.postUser);

module.exports = router;