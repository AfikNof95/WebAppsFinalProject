const UserController = require('../controllers/user.controller');

const router = require('express').Router();

router.post('/Photo', UserController.uploadPhoto);

module.exports = router;
