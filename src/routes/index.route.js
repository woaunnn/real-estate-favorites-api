const express = require('express');
const router = express.Router();

const propertyRoutes = require('./property.route');
const userRoutes = require('./user.route');

router.use('/property', propertyRoutes);
router.use('/user', userRoutes);

module.exports = router;
