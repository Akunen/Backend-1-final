const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// POST http://localhost:3000/users/register
router.post('/register', userController.register);

// POST http://localhost:3000/users/login
router.post('/login', userController.login);

module.exports = router;
