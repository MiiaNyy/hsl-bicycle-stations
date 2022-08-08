import mongoose from "mongoose";

const stationSchema = new mongoose.Schema( {
	stationId: Number,
	nameFIN: String,
	nameSWE: String,
	nameENG: String,
	addressFIN: String,
	addressSWE: String,
	cityFIN: String,
	citySWE: String,
	capacity: Number,
	x: Number,
	y: Number,
});

const Station = mongoose.model( "Station", stationSchema );

export { Station };
