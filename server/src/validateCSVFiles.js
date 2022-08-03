import fs from "fs";
import csv from "csv-parser";
import toCamelCase from "./helpers/toCamelCase";

import { Journey as JourneyModel } from "./models/journey";
import csvWriter from "csv-write-stream";

const results = [];
let writer = csvWriter();

const validatedCsvFilePath = '/Users/miianyyssonen/Documents/Ohjelmointi/hsl-bicycle-stations/server/src/lazyWithAbsPath.csv';

async function validateCSVFiles (filePath) {
	
	fs.createReadStream( filePath )
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
		  strict : true,
	  } ) )
	  .on( 'data', (row) => {
		  validateData( row, () => {
			  writer = csvWriter();
			  if ( !fs.existsSync( validatedCsvFilePath ) ) {
				  writer.pipe( fs.createWriteStream( validatedCsvFilePath, { flags : 'a' } ) );
				  writer.write( row  );
			  } else {
				  writer = csvWriter( { sendHeaders : false } );
				  writer.pipe( fs.createWriteStream( validatedCsvFilePath, { flags : 'a' } ) );
				  writer.write( row );
			  }
			  writer.end();
			
		  } )
	  } )
	  .on( 'end', () => {
		  console.log( "On end of validation!" );
		  /*fs.writeFile( 'test-journeys.json', JSON.stringify( results ), (err) => {
		   if ( err ) throw err;
		   console.log( `🎉 Inserted journeys to database` );
		   } );*/
	  } );
}


function validateData (data, callback) {
	if ( data.duration > 10 || data.coveredDistance > 10 ) {
		callback()
	}
}


export default validateCSVFiles;
