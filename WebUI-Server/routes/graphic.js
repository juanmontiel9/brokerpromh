var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('graphic', { title: 'Prometheus Proyect.', message: "Remote car moved by myoelectric signals." });
});

module.exports = router;
