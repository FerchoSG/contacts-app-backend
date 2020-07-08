const { Router } = require('express');
const UserRouter = require('./user.routes');
const ContactRouter = require('./contact.routes');

const router = Router();

router.use('/users', UserRouter);
router.use('/contacts', ContactRouter);

module.exports = router;