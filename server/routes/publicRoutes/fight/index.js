/*
    All routes concerning fight are declared here
 */

const express = require('express');
const router = express.Router();

router.post('/', require('./addFight'));

module.exports = router;