var express = require('express');
var router = express.Router();
var request = require('request');


/* GET home page. */
router.get('/', function(req, res, next) {
  var search = req.query.search; // $_GET["search"] Superglobal.

  request('https://api.mercadolibre.com/sites/MLA/search?q='+search, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          res.render('items', { title: "MercadoLibre",resultados: JSON.parse(body) });
       }
  });
});

module.exports = router;
