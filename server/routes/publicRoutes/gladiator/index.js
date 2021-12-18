/*
    All routes concerning gladiators are declared here.
 */

const express = require('express');
const router = express.Router();

router.get('/gladiatorType/:id', require('./getGladiatorsByType'));

module.exports = router;