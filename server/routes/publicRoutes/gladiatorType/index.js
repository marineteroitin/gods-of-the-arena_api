/*
    All routes concerning gladiatorType are declared here.
 */

const express = require('express');
const router = express.Router();

router.get('/', require('./getGladiatorTypes'));

module.exports = router;
``

