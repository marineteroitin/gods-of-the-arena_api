/*
 All routes concerning proposition are declared here
 */

const express = require('express');
const router = express.Router();

router.post('/', require('./addProposition'));

module.exports = router;