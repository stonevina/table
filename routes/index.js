var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/v1/columns', function(req, res, next) {
  res.json({
    method: ['OPC', 'PAGE', 'HPLC'],
    decor: ['Cy3']
  });
});

module.exports = router;
