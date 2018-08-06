const express = require('express');
const meteoRouter = express.Router();
const Station =require("./station.model");

meteoRouter.get('/', (req, res, next) => {
  Station.find()
  .then( objList => res.status(200).json(objList))
  .catch(e => next(e))
})

module.exports = meteoRouter;