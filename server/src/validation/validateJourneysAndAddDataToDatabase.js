import fs from "fs";
import csv from "csv-parser";

import toCamelCase from "../helpers/toCamelCase";
import getCurrentTime from "../helpers/getCurrentTime";

import validateJourneyData from "./validateJourneyData";

import { Journey as JourneyModel } from "../models/journey";

async function validateJourneysAndAddDataToDatabase (filePath) {
	let counter = 0;
	let batchCounter = 0;
	let batchSize = 1000;
	let batch = [];
	
	const startingTime = getCurrentTime();
	
	const stream = fs.createReadStream( filePath )
					 .pipe( csv( {
						 mapHeaders : ({ header, index }) => {
							 return mapJourneyHeaders( header, index );
						 },
						 mapValues : ({ header, value }) => {
							return mapJourneyValues({header, value});
						 },
						 strict : true,
					 } ) )
	
					 .on( 'data', (row) => {
						 validateJourneyData( row, () => {
							 batch.push( row )
							 counter++;
							 batchCounter++;
							 if ( batchCounter >= batchSize ) {
								 stream.pause();
								 JourneyModel.insertMany( batch, (err, docs) => {
									 if ( err ) throw err;
									 batch = [];
									 batchCounter = 0;
									 console.log( `${ counter } journeys written to database` );
									 stream.resume()
								 } )
							 }
						 } )
					 } )
					 .on( 'end', () => {
						 console.log( '🎉 Journeys csv file validation complete. Adding last journeys to db...' );
						 JourneyModel.insertMany( batch, (err, docs) => {
							 if ( err ) throw err;
							 console.log('🎊 Stream ended!! Journey stream started at: ' + startingTime + ' and ended' +
								 ' at: ' + getCurrentTime());
						 } )
						 
					 } );
}

function mapJourneyHeaders (header, index) {
	header = header.trim(); // Remove whitespace
	switch ( index ) {
		case 6: // Covered distance (m)
			return toCamelCase( header.slice( 0, -3 ) );
		case 7: // Duration (sec.)
			return toCamelCase( header.slice( 0, -6 ) );
		default:
			return toCamelCase( header );
	}
}

function mapJourneyValues ({ header, value }) {
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
			return parseInt( value );
		default:
			return value;
	}
}

export default validateJourneysAndAddDataToDatabase;
