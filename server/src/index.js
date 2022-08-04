import 'dotenv/config'
import mongoose from 'mongoose';

import { ApolloServer } from 'apollo-server';

const journeysCsvFilePath1 = "/Users/miianyyssonen/Documents/Ohjelmointi/hsl-bicycle-stations/resources/2021-05.csv";
const journeysCsvFilePath2 = "/Users/miianyyssonen/Documents/Ohjelmointi/hsl-bicycle-stations/resources/2021-06.csv";
const journeysCsvFilePath3 = "/Users/miianyyssonen/Documents/Ohjelmointi/hsl-bicycle-stations/resources/2021-07.csv";

const journeysCsvFilePaths = [journeysCsvFilePath1, journeysCsvFilePath2, journeysCsvFilePath3];


import { typeDefs } from './typeDefs'
import { resolvers } from './resolvers'

import { Journey as JourneyModel } from "./models/journey";
import Journeys from "./dataSources/journeys";
import validateCSVFiles from "./validateCSVFiles";

const uri = process.env.MONGODB_URI;

const main = async () => {
	
	await mongoose.connect(
		uri,
		{ useNewUrlParser : true, useUnifiedTopology : true },
		(err) => {
			if ( err ) throw err;
			// Validate and Load CSV files to database!
			console.log( `🎉 Connected to database successfully!!"` );
			validateCSVFiles( journeysCsvFilePath1 ).then(() => console.log( 'After csv validation' ) );
			
		} );
};



main()
	.then( () => {
		console.log( `In the database main() function!"` );
	} )
	.catch( error => console.error( error ) );

const dataSources = () => ( {
	journeys : new Journeys( JourneyModel ),
} );

const server = new ApolloServer( { typeDefs, resolvers, dataSources } )

server.listen( { port : process.env.PORT || 4000 } ).then( ({ url }) => {
	console.log( `🚀 Server ready at ${ url }` );
	
} );
