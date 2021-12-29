/*
    All routes concerning fight are declared here
 */

const express = require('express');
const router = express.Router();

router.post('/', require('./addFight'));
router.get('/today', require('./getTodaysFights'));

module.exports = router;