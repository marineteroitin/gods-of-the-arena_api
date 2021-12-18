/*
    All public routes are declared here.
 */


const express = require('express');
const router = express.Router();

router.use('/gladiatorType', require('./gladiatorType'));

module.exports = router;