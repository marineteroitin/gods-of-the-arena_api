/*
 All routes concerning proposition are declared here
 */

const express = require('express');
const router = express.Router();

router.post('/', require('./addProposition'));
router.get('/', require('./getPropositions'));

module.exports = router;