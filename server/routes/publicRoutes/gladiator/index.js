/*
    All routes concerning gladiators are declared here.
 */

const express = require('express');
const router = express.Router();

router.get('/gladiatorType/:id', require('./getGladiators'));

module.exports = router;