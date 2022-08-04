import mongoose from "mongoose";


const journeySchema = new mongoose.Schema( {
    departure: String,
    return: String,
    departureStationId: Number,
	departureStationName: String,
	returnStationId: Number,
	returnStationName: String,
    coveredDistance: Number,
    duration: Number,
});

const Journey = mongoose.model( "Journey", journeySchema );

export { Journey };
