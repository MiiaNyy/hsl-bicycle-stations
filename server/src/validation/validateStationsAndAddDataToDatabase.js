import fs from "fs";

import csv from "csv-parser";
import getCurrentTime from "../helpers/getCurrentTime";
import toCamelCase from "../helpers/toCamelCase";

import { Station, Station as StationModel } from "../models/station";

import validateStationData from "./validateStationData";
import { Journey as JourneyModel } from "../models/journey";

async function validateStationsAndAddDataToDatabase (filePath) {
	let counter = 0;
	let batchCounter = 0;
	let batchSize = 100;
	let batch = [];
	
	const startingTime = getCurrentTime();
	
	const stream = fs.createReadStream( filePath )
					 .pipe( csv( {
						 mapHeaders : ({ header, index }) => {
							 header = header.trim();
							 switch ( index ) {
								 case 1: // ID
									 return "stationId";
								 case 2: // Nimi
									 return "nameFIN";
								 case 3: // Namn
									 return "nameSWE";
								 case 4: // Name
									 return "nameENG";
								 case 5: // Osoite
									 return "addressFIN";
								 case 6: // Adress
									 return "addressSWE";
								 case 7: // kaupunki
									 return "cityFIN";
								 case 8: // Stad
									 return "citySWE";
								 case 10: // Kapaciteetti
									 return "capacity";
								 case 11: // x
									 return "longitude";
								 case 12: // y
									 return "latitude";
								 default:
									 return toCamelCase( header );
							 }
						 },
						 mapValues : ({ header, value }) => {
							 switch ( header ) {
								 case "stationId":
									 return parseInt( value );
								 case "capacity":
									 return parseInt( value );
								 case "longitude":
									 return parseFloat( value );
								 case "latitude":
									 return parseFloat( value );
								 case "cityFIN":
									 // On dataset only Espoo city names are shown. If the city name is not Espoo,
									 // it is Helsinki
									 return value === null ? "Helsinki" : value;
								 case "citySWE":
									 return value === null ? "Helsingfors" : value;
								 default:
									 return value;
							 }
						 },
						 strict : true,
					 } ) )
	
					 .on( 'data', (row) => {
						 validateStationData( row, () => {
							 batch.push( row )
							 counter++;
							 batchCounter++;
							 if ( batchCounter >= batchSize ) {
								 stream.pause();
								 StationModel.insertMany( batch, (err, docs) => {
									 if ( err ) throw err;
									 batch = [];
									 batchCounter = 0;
									 console.log( `${ counter } stations written to database` );
									 stream.resume()
								 } )
							 }
						 } );
					 } )
					 .on( 'end', () => {
						 console.log( "Done reading file, adding last journeys to database" );
						 StationModel.insertMany( batch, (err, docs) => {
							 if ( err ) throw err;
							 console.log( `last ${ batch.length } stations written to database` );
						 } )
					 } );
}

export default validateStationsAndAddDataToDatabase;



