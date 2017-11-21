var express = require('express');
var router = express.Router();
var request = require('request');

/* GET search page. */
router.get('/', function(req, res, next) {
  var search = req.query.search; // $_GET["search"] Superglobal.

  request('https://api.mercadolibre.com/sites/MLA/search?q='+search, function (error, response, body) {

      if (!error && response.statusCode == 200) {
          res.render('items', { title: "MercadoLibre",resultados: JSON.parse(body) });
       }
  });
});


router.get('/:id', function(req, res, next) {

var id = req.params.id;
var nuevo = "Nuevo";
var usado = "Usado";

request('https://api.mercadolibre.com/items/'+id+'/description', function(error, response, body){

  var desc= JSON.parse(body);

  request('https://api.mercadolibre.com/items/'+id, function (error, response, body) {

    if (!error && response.statusCode == 200) {
        res.render('detail', { title: "MercadoLibre",resultados: JSON.parse(body), desc, usado, nuevo });
     }
   });
  });
});

module.exports = router;
