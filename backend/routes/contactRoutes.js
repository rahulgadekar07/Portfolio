const express = require('express');
const router = express.Router();
const { createContact, getAllContacts, sendReply  } = require('../controllers/contactController');

router.post('/contact', createContact);
router.post('/send-reply', sendReply);
router.get('/contact', getAllContacts);
module.exports = router;
