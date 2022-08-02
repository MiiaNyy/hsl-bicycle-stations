import 'dotenv/config'
import mongoose from 'mongoose';

import { ApolloServer } from 'apollo-server';

import csvtojson from "csvtojson";

import { typeDefs } from './typeDefs'
import { resolvers } from './resolvers'

import { Journey as JourneyModel } from "./models/journey";
import Journeys from "./dataSources/journeys";

const uri = process.env.MONGODB_URI;

const csvFilePath = "/Users/miianyyssonen/Documents/Ohjelmointi/hsl-bicycle-stations/server/src/2021-05.csv";
const jsonArray = async () => csvtojson().fromFile( csvFilePath );

const main = async () => {
    await mongoose.connect(
        uri,
        { useNewUrlParser: true, useUnifiedTopology: true },
        (err) => {
            if ( err ) throw err;
            // Validate and Load CSV files to database!
            console.log( `🎉 Connected to database successfully VOL 2"` );
        } );
};

main()
    .then( () => {
        const newJourney = new JourneyModel( {
            departureTime: "2020-05-20T08:00:00.000Z",
            returnTime: "2020-05-20T09:00:00.000Z",
            departureStation: {
                address: "Kauppakorkeakoulu",
                journeysStartingFrom: 10,
                journeysEndingAt: 4
            },
            returnStation: {
                address: "Kaisaniemi",
                journeysStartingFrom: 4,
                journeysEndingAt: 8
            },
            coveredDistance: 5000,
            duration: 1025
            
        });
        newJourney.save()
            .then( () => console.log( "🎉 Saved journey to database successfully" ) );
        console.log( `🎉 Connected to database successfully VOL 1` );
    } )
    .catch( error => console.error( error ) );

const dataSources = () => ({
    journeys: new Journeys( JourneyModel ),
});

const server = new ApolloServer( { typeDefs, resolvers, dataSources } )

server.listen( { port: process.env.PORT || 4000 } ).then( ({ url }) => {
    console.log( `🚀 Server ready at ${ url }` );
} );
