import fs from "fs";

import csv from "csv-parser";


import toCamelCase from "./helpers/toCamelCase";
import validateData from "./helpers/validateData";

import { Journey as JourneyModel } from "./models/journey";



async function validateCSVFiles (filePath) {
	let counter = 0;
	let batchCounter = 0;
	let batchSize = 500;
	let batch = [];
	const stream = fs.createReadStream( filePath )
					 .pipe( csv( {
						 mapHeaders : ({ header, index }) => {
							 header = header.trim(); // Remove whitespace
							 switch ( index ) {
								 case 6:
									 return toCamelCase( header.slice( 0, -3 ) );
								 case 7:
									 return toCamelCase( header.slice( 0, -6 ) );
								 default:
									 return toCamelCase( header );
							 }
						 },
						 mapValues : ({ header, value }) => {
							 switch ( header ) {
								 case "departureStationId":
									 return parseInt( value );
								 case "returnStationId":
									 return parseInt( value );
								 case "duration":
									 return parseInt( value );
								 case "coveredDistance":
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
						 } )
					 } );
}


export default validateCSVFiles;
