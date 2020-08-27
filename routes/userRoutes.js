const express = require('express');
const userController = require('./../controllers/userController')

const router = express.Router();

// creating param middleware; middleware that only runs for certain parameters

router.route('/')
.get(userController.getAllUsers)
.post(userController.createUser)

router.route('/:id')
.get(userController.getOneUser)
.patch(userController.updateUser)
.delete(userController.deleteUser)

module.exports = router;
