var controllers = require('../controllers').api;
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send(controllers.testFunction());
});

router.get('/stats', (req, res, next) => {
  controllers.get.stats((result) => {
    res.send(result);
  });
});

router.get('/online', (req, res, next) => {
  controllers.get.online((result) => {
    res.send(result);
  });
});

router.get('/sensors', (req, res, next) => {
  controllers.get.sensors((result, code) => {
    res.send(result);
  });
});

router.get('/announcement/:index(\\d+)/:range(\\d+)', (req, res, next) => {
  let {index, range} = req.params;
  controllers.get.announcement(parseInt(index), parseInt(range), (result) => {
    res.send(result);
  });
});

module.exports = router;
