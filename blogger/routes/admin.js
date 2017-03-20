var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin', {info: "This section will be used by admin."});
});

module.exports = router;
