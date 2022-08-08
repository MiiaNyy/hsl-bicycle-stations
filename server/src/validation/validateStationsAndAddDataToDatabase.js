import fs from "fs";

import csv from "csv-parser";
import getCurrentTime from "../helpers/getCurrentTime";
import toCamelCase from "../helpers/toCamelCase";
import validateJourneyData from "./validateJourneyData";
import { Journey as JourneyModel } from "../models/journey";

async function validateStationsAndAddDataToDatabase (filePath) {
	let counter = 0;
	let batchCounter = 0;
	let batchSize = 1000;
	let batch = [];
	
	const startingTime = getCurrentTime();
	
	const stream = fs.createReadStream( filePath )
					 .pipe( csv( {
						 mapHeaders : ({ header, index }) => {
							 header = header.trim();
							 switch ( index ) {
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
								 case 9: // Kapaciteetti
									 return "capacity";
								 default:
									 return toCamelCase( header );
							 }
						 },
						 mapValues : ({ header, value }) => {
							 console.log( header, value );
							 return value;
						 },
						 strict : true,
					 } ) )
	
					 .on( 'data', (row) => {
						 console.log( row )
					 } )
					 .on( 'end', () => {
						 console.log( "Done reading file" );
		
					 } );
}

