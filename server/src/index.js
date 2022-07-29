import 'dotenv/config'
import mongoose from 'mongoose';

import { ApolloServer } from 'apollo-server';

import { typeDefs } from './typeDefs'
import { resolvers } from './resolvers'

import { Journey as JourneyModel } from "./models/journey";
import Journeys from "./dataSources/journeys";

const uri = process.env.MONGODB_URI;

const main = async () => {
    await mongoose.connect( uri, { useNewUrlParser: true, useUnifiedTopology: true } );
};

main()
    .then( () => console.log( '🎉 Connected to database successfully' ) )
    .catch( error => console.error( error ) );

const dataSources = () => ({
    journeys: new Journeys( JourneyModel ),
});

const server = new ApolloServer( { typeDefs, resolvers, dataSources } )

server.listen( { port: process.env.PORT || 4000 } ).then( ({ url }) => {
    console.log( `🚀 Server ready at ${ url }` );
} );
