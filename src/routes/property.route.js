const express = require('express');
const router = express.Router();
const {
    getProperties,
} = require('../controllers/property.controller');

router.get('/list', getProperties);

module.exports = router;
