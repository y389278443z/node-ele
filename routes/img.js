const express = require('express')
const captcha = require('../controller/img/captchas')
const router = express();


router.post('/captchas', captcha.getCaptcha);



module.exports = router;