/*
    All public routes are declared here.
 */


const express = require('express');
const router = express.Router();

router.use('/gladiatorType', require('./gladiatorType'));
router.use('/proposition', require('./proposition'));
router.use('/gladiator', require('./gladiator'));

module.exports = router;