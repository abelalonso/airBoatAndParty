const mongoose = require ('mongoose');
const Schema = mongoose.Schema;



const stationSchema = new Schema ({
  latitud: String,
  provincia: String,
  altitud: String,
  indicativo: String,
  nombre: String,
  indsinop: String,
  longitud: String
}) 

const Station = mongoose.model("Station", stationSchema);
module.exports = Station;