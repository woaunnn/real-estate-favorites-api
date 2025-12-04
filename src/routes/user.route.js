const express = require('express');
const router = express.Router();
const {
    getUsers,
    createUser,
    getUserById,
    updateFavorites,
} = require('../controllers/user.controller');

router.get('/list', getUsers);
router.post('/create', createUser);
router.get('/:id', getUserById);
router.patch('/favorites/:id', updateFavorites);

module.exports = router;
