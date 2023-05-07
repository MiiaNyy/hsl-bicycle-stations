import fs from "fs";
import csv from "csv-parser";

import toCamelCase from "../helpers/toCamelCase.js";
import getCurrentTimeInHMSS from "../helpers/getCurrentTimeInHMSS.js";

import validateJourneyData from "./validateJourneyData.js";

import { Journey as JourneyModel } from "../models/journey.js";

import { Transform } from "stream";
import { promisify } from "util";

async function validateJourneysAndAddDataToDatabase(filePath) {
  console.log(
    "Validating journeys and adding them to database for file path: " + filePath
  );
  let counter = 0;
  let batchCounter = 0;
  const batchSize = 1000;
  const batch = [];

  const startingTime = getCurrentTimeInHMSS();

  const validateJourneyDataAsync = promisify(validateJourneyData);

  const stream = fs
    .createReadStream(filePath)
    .pipe(
      csv({
        mapHeaders: ({ header, index }) => mapJourneyHeaders(header, index),
        mapValues: ({ header, value }) => mapJourneyValues({ header, value }),
        strict: true,
      })
    )
    .pipe(
      new Transform({
        objectMode: true,
        transform: (row, encoding, callback) => {
          validateJourneyDataAsync(row)
            .then(() => {
              batch.push(row);
              counter++;
              batchCounter++;

              if (batchCounter >= batchSize) {
                stream.pause();

                JourneyModel.bulkWrite(
                  batch.map((journey) => ({
                    insertOne: { document: journey },
                  }))
                )
                  .then(() => {
                    batch.length = 0;
                    batchCounter = 0;
                    console.log(`${counter} journeys written to database`);
                    stream.resume();
                  })
                  .catch((error) => {
                    console.error(error);
                  });
              }

              callback();
            })
            .catch((error) => {
              console.error(error);
              callback();
            });
        },
      })
    )
    .on("end", () => {
      console.log(
        "🎉 Journeys csv file validation complete. Adding last journeys to db..."
      );

      JourneyModel.bulkWrite(
        batch.map((journey) => ({
          insertOne: { document: journey },
        }))
      )
        .then(() => {
          console.log("🎊 Stream ended!! All journeys added to db!");
          console.log(
            "Journey stream started at: " +
              startingTime +
              " and ended at: " +
              getCurrentTimeInHMSS()
          );
        })
        .catch((error) => {
          console.error(error);
        });
    });
}

function mapJourneyHeaders(header, index) {
  header = header.trim(); // Remove whitespace
  switch (index) {
    case 6: // Covered distance (m)
      return toCamelCase(header.slice(0, -3));
    case 7: // Duration (sec.)
      return toCamelCase(header.slice(0, -6));
    default:
      return toCamelCase(header);
  }
}

function mapJourneyValues({ header, value }) {
  switch (header) {
    case "departure":
      return new Date(value);
    case "return":
      return new Date(value);
    case "departureStationId":
      return parseInt(value);
    case "returnStationId":
      return parseInt(value);
    case "duration":
      return parseInt(value);
    case "coveredDistance":
      return parseInt(value);
    default:
      return value;
  }
}

export default validateJourneysAndAddDataToDatabase;
