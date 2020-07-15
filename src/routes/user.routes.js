const { Router } = require('express');
const UserController =  require('../controllers/users.controllers');
const { isAuth } = require('../services/session');

const router = Router();

router.get('/',isAuth ,UserController.getAllUsers)
router.get('/contacts/:id', UserController.getUserContacts)
router.get('/:id', isAuth ,UserController.getAUser)
router.post('/', UserController.addUser)
router.put('/:id', isAuth ,UserController.updateUser)
router.delete('/:id', isAuth ,UserController.deleteUser)

module.exports = router;