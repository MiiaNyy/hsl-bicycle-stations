import 'dotenv/config'
import mongoose from 'mongoose';

import { ApolloServer } from 'apollo-server';

const journeysCsvFilePath1 = "/Users/miianyyssonen/Documents/Ohjelmointi/hsl-bicycle-stations/resources/2021-05.csv";
const journeysCsvFilePath2 = "/Users/miianyyssonen/Documents/Ohjelmointi/hsl-bicycle-stations/resources/2021-06.csv";
const journeysCsvFilePath3 = "/Users/miianyyssonen/Documents/Ohjelmointi/hsl-bicycle-stations/resources/2021-07.csv";

const journeysCsvFilePaths = [journeysCsvFilePath1, journeysCsvFilePath2, journeysCsvFilePath3];


import csvWriter from 'csv-write-stream';


/* const journeyDataInJson = csvtojson().fromFile( csvFilePath );
 journeyDataInJson.then( ( resources ) => {
 
 JourneyModel.insertMany( resources, ( err, docs ) => {
 if ( err ) throw err;
 console.log( `🎉 Inserted ${ docs.length } journeys to database` );
 });*/


import { typeDefs } from './typeDefs'
import { resolvers } from './resolvers'

import { Journey as JourneyModel } from "./models/journey";
import Journeys from "./dataSources/journeys";

import validateCSVFiles from "./validateCSVFiles";
import fs from "fs";

const uri = process.env.MONGODB_URI;

const main = async () => {
	await mongoose.connect(
		uri,
		{ useNewUrlParser : true, useUnifiedTopology : true },
		(err) => {
			if ( err ) throw err;
			// Validate and Load CSV files to database!
			console.log( `🎉 Connected to database successfully VOL 2"` );
		} );
};


main()
	.then( async () => {
		const writer = csvWriter({sendHeaders: false})
		writer.pipe( fs.createWriteStream( "/Users/miianyyssonen/Documents/Ohjelmointi/hsl-bicycle-stations/server/src/lazyWithAbsPath.csv", { flags : 'a' } ) );
		writer.write({departure: "departure", return: "return", departureStationId: "departureStationId", departureStationName: "departureStationName", returnStationId: "returnStationId", returnStationName: "returnStationName", coveredDistance: "coveredDistance", duration: "duration"});
		writer.end()
		
		await validateCSVFiles( journeysCsvFilePath1 );
		// After validation import resources to mongoDB Atlas using mongoimport terminal command
		// mongoimport --uri mongodb+srv://mongoDemo:Em3jeWBO2uAlRcu4@cluster0.azfir.mongodb.net/hslBicycleStations --collection journeys --type csv --file resources/2021-05.csv --headerline
		
	} )
	.catch( error => console.error( error ) );

const dataSources = () => ( {
	journeys : new Journeys( JourneyModel ),
} );

const server = new ApolloServer( { typeDefs, resolvers, dataSources } )

server.listen( { port : process.env.PORT || 4000 } ).then( ({ url }) => {
	console.log( `🚀 Server ready at ${ url }` );

} );
