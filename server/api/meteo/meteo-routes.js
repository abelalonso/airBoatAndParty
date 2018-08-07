const express = require('express');
const meteoRouter = express.Router();
const Station = require("./station.model");
const {AEMET_KEY} = process.env

meteoRouter.get('/', (req, res, next) => {
  Station.find()
  .then( objList => res.status(200).json(objList))
  .catch(e => next(e))
})

meteoRouter.get('/:id', (req, res, next) => {
  Station.findById(req.params.id)
  .then( objList => {
    console.log(req.params.id, objList)
    res.status(200).json(objList)})
  .catch(e => next(e))
})

meteoRouter.get('/info/:ccaa', (req, res, next) => {

  var request = require("request");
  var tomorrowInfo, soonInfo;

  var options = { method: 'GET',
    url: `https://opendata.aemet.es/opendata/api/prediccion/ccaa/medioplazo/${req.params.ccaa}`,
    qs: { 'api_key': AEMET_KEY },
    headers: 
    { 'cache-control': 'no-cache' } };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    soonInfo = JSON.parse(body).datos;
    options.url = `https://opendata.aemet.es/opendata/api/prediccion/ccaa/manana/${req.params.ccaa}`
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      tomorrowInfo = JSON.parse(body).datos;
      options.url = tomorrowInfo;

      console.log({tomorrowInfo, soonInfo})
      res.json({tomorrowInfo, soonInfo});

    });
  });

  
})

module.exports = meteoRouter;