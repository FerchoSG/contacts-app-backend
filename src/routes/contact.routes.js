const { Router } = require('express');
const ContactController = require('../controllers/contacts.controller')

const router = Router();

router.get('/', ContactController.getAllContacts)
router.get('/:id', ContactController.getAContact)
router.post('/', ContactController.addContact)
router.put('/:id', ContactController.updateContact)
router.delete('/:id', ContactController.deleteContact)

module.exports = router;