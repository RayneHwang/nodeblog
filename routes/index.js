var express = require('express');
var router = express.Router();
var topic = require('../controllers/topic');
var auth = require("../middlewares/auth");

/**
 * Home page router
 * Inject a scrf token to home page
 */
router.get('/', auth.getCsrfToken, topic.home);

module.exports = router;
