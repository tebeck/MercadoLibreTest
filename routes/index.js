var express = require('express');
var router = express.Router();
var request = require('request');

/* GET search page. */
router.get('/', function(req, res, next) {
// $_GET["search"] Superglobal.
  var search = req.query.search;

  request('https://api.mercadolibre.com/sites/MLA/search?q='+search, function (error, response, body) {
    var sApi = JSON.parse(body);
      if (!error && response.statusCode == 200) {
          res.render('index', { title: "MercadoLibre", sApi });
       }
  });
});

module.exports = router;
