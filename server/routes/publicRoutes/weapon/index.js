/*
    All routes concerning weapons are declared here.
 */

const express = require('express');
const router = express.Router();

router.get('/gladiatorType/:id', require('./getWeaponsByGladiatorType'));

module.exports = router;