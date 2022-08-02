import mongoose from "mongoose";


const journeySchema = new mongoose.Schema( {
    departure: Date,
    return: Date,
    departureStation: {
        address: String,
        journeysStartingFrom: Number,
        journeysEndingAt: Number
    },
    coveredDistance: Number,
    duration: Number,
});

const Journey = mongoose.model( "Journey", journeySchema );

export { Journey };
