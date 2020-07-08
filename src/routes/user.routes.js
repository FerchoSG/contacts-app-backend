const { Router } = require('express');
const UserController =  require('../controllers/users.controllers')

const router = Router();

router.get('/', UserController.getAllUsers)
router.get('/:id', UserController.getAUser)
router.post('/', UserController.addUser)
router.put('/:id', UserController.updateUser)
router.delete('/:id', UserController.deleteUser)

module.exports = router;