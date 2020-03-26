var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Prometheus Proyect.', message: "Remote car moved by myoelectric signals." });
});

module.exports = router;
