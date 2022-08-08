import fs from "fs";

import csv from "csv-parser";

import toCamelCase from "./helpers/toCamelCase";
import validateData from "./helpers/validateData";

import { Journey as JourneyModel } from "./models/journey";

import getCurrentTime from "./helpers/getCurrentTime";

async function validateCsvFileAndAddDataToDatabase (filePath) {
	let counter = 0;
	let batchCounter = 0;
	let batchSize = 1000;
	let batch = [];
	
	const startingTime = getCurrentTime();
	console.log( `🎉 Validating ${ filePath }` );
	
	const stream = fs.createReadStream( filePath )
					 .pipe( csv( {
						 mapHeaders : ({ header, index }) => {
							 header = header.trim(); // Remove whitespace
							 switch ( index ) {
								 case 6: // Covered distance (m)
									 return toCamelCase( header.slice( 0, -3 ) );
								 case 7: // Duration (sec.)
									 return toCamelCase( header.slice( 0, -6 ) );
								 default:
									 return toCamelCase( header );
							 }
						 },
						 mapValues : ({ header, value }) => {
							 switch ( header ) {
								 case "departure":
									 return new Date( value );
								 case "return":
									 return new Date( value );
								 case "departureStationId":
									 return parseInt( value );
								 case "returnStationId":
									 return parseInt( value );
								 case "duration":
									 return parseInt( value );
								 case "coveredDistance":
									 if ( value === isNaN(value) ) console.log( `🚫 Invalid distance: ${ value }` );
									 return parseInt( value );
								 default:
									 return value;
							 }
						 },
						 strict : true,
					 } ) )
	
					 .on( 'data', (row) => {
						 validateData( row, () => {
							 batch.push( row )
							 counter++;
							 batchCounter++;
							 if ( batchCounter >= batchSize ) {
								 stream.pause();
								 JourneyModel.insertMany( batch, (err, docs) => {
									 if ( err ) throw err;
									 batch = []
									 batchCounter = 0
									 console.log( `${ counter } journeys written to database` );
									 stream.resume()
								 } )
							 }
						 } )
					 } )
					 .on( 'end', () => {
						 console.log( '🎉 CSV file validation complete. Adding last journeys to db' );
		
						 JourneyModel.insertMany( batch, (err, docs) => {
							 if ( err ) throw err;
							 console.log( `last ${ batch.length } journeys written to database` );
							 console.log('Stream started at: ' + startingTime + ' and ended at: ' + getCurrentTime());
						 } )
						 
					 } );
}


export default validateCsvFileAndAddDataToDatabase;
