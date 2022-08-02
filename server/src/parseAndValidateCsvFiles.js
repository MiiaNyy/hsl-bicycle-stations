import fs from "fs";
import csv from "csv-parser";
import toCamelCase from "./helpers/toCamelCase";

const journeysCsvFilePath1 = "/Users/miianyyssonen/Documents/Ohjelmointi/hsl-bicycle-stations/data/2021-05.csv";
const journeysCsvFilePath2 = "/Users/miianyyssonen/Documents/Ohjelmointi/hsl-bicycle-stations/data/2021-06.csv";
const journeysCsvFilePath3 = "/Users/miianyyssonen/Documents/Ohjelmointi/hsl-bicycle-stations/data/2021-07.csv";

const journeysCsvFilePaths = [journeysCsvFilePath1, journeysCsvFilePath2, journeysCsvFilePath3];

const results = [];

async function loopAndValidateJourneyData () {
	for ( const element of journeysCsvFilePaths ) {
		console.log( "Validating file " + element );
		await validateCSVFiles( element );
	}
	await console.log( "🎉 Validation done. There is " + results.length + " journeys in the database" );
}

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
	  .on( 'data', (data) => {
		  if ( data.duration > 10 || data.coveredDistance > 10 ) {
			  results.push( data );
		  }
		
	  } )
	  .on( 'end', () => {
		  console.log( results[0] );
		  console.log( "There is " + results.length + " journeys in the file" );
		  /*
		   JourneyModel.insertMany( results, ( err, docs ) => {
		   if ( err ) throw err;
		   console.log( `🎉 Inserted ${ docs.length } journeys to database` );
		   });*/
	  } );
}

export default loopAndValidateJourneyData;
