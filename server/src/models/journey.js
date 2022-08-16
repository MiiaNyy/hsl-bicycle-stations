import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";


const journeySchema = new mongoose.Schema( {
    departure: Date,
    return: Date,
    departureStationId: Number,
	returnStationId: Number,
	coveredDistance: Number,
    duration: Number,
});

journeySchema.plugin(mongoosePaginate);

const Journey = mongoose.model( "Journey", journeySchema );

export { Journey };
