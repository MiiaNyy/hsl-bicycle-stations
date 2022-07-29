import mongoose from "mongoose";

const Journey = mongoose.model( "Journey", {
    departureTime: String,
    returnTime: String,
    departureStation: {
        address: String,
        journeysStartingFrom: Number,
        journeysEndingAt: Number
    },
    coveredDistance: Number,
    duration: Number,
} );

export { Journey };
