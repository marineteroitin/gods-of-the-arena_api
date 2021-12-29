/*
    All routes concerning gladiators are declared here.
 */

const express = require('express');
const router = express.Router();

router.get('/gladiatorType/:id', require('./getGladiatorsByType'));
router.get('/animals', require('./getAllAnimals'));

module.exports = router;