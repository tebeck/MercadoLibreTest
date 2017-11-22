var express = require('express');
var request = require('request');
var router = express.Router();


/* GET search page. */
router.get('/', function(req, res, next) {
 // $_GET["search"] Superglobal.
  var search = req.query.search;
  request('https://api.mercadolibre.com/sites/MLA/search?q='+search, function (error, response, body) {
    var sApi = JSON.parse(body);
    if (!error && response.statusCode == 200) {
        res.render('items', { title: "MercadoLibre", sApi });
      }
  });
});

router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    var nuevo = "Nuevo";
    var usado = "Usado";
  request('https://api.mercadolibre.com/items/'+id+'/description', function(error, response, body){
      var dApi = JSON.parse(body);
    request('https://api.mercadolibre.com/items/'+id, function (error, response, body) {
        var iApi = JSON.parse(body);
        var id_category = iApi.category_id;
      request('https://api.mercadolibre.com/categories/'+id_category, function(error, response, body){
            var cApi = JSON.parse(body);

  if (!error && response.statusCode == 200) {
        res.render('detail', { title: "MercadoLibre", iApi, dApi, usado, nuevo, cApi });
      }
    });
  });
});
});


module.exports = router;
