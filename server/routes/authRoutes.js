const express = require('express');
const { registerUser, userLogin } = require('../controllers/authControllers');
const { registerValidation, loginValidation } = require('../helpers/validations');

const router = express.Router();

router.post('/register', registerValidation, registerUser);

router.post('/login', loginValidation, userLogin);

module.exports = router;
