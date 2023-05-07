import mongoose from "mongoose";

import mongoosePaginate from "mongoose-paginate-v2";

const stationSchema = new mongoose.Schema({
  stationId: Number,
  nameFIN: String,
  nameSWE: String,
  nameENG: String,
  addressFIN: String,
  addressSWE: String,
  cityFIN: String,
  citySWE: String,
  capacity: Number,
  longitude: Number,
  latitude: Number,
});

stationSchema.plugin(mongoosePaginate);

const Station = mongoose.model("Station", stationSchema);

export { Station };
