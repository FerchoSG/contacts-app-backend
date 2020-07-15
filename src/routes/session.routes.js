const { Router } = require('express');
const UserController =  require('../controllers/users.controllers');
const { authenticate } = require('../services/session')

const router = Router();


router.post('/login', authenticate);

router.post('/register', UserController.addUser)


module.exports = router;