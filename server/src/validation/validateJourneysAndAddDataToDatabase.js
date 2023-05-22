import fs from "fs";
import csv from "csv-parser";

import toCamelCase from "../helpers/toCamelCase.js";
import getCurrentTimeInHMSS from "../helpers/getCurrentTimeInHMSS.js";

import validateJourneyData from "./validateJourneyData.js";

import { Journey as JourneyModel } from "../models/journey.js";

async function validateJourneysAndAddDataToDatabase(filePaths) {
  const startingTime = getCurrentTimeInHMSS();
  const batchSize = 5000;
  let totalJourneys = 0;

  for (let i = 0; i < filePaths.length; i++) {
    const filePath = filePaths[i];
    let counter = 0;
    let batchCounter = 0;
    let batch = [];

    const stream = fs.createReadStream(filePath).pipe(
      csv({
        mapHeaders: ({ header, index }) => {
          return mapJourneyHeaders(header, index);
        },
        mapValues: ({ header, value }) => {
          return mapJourneyValues({ header, value });
        },
        strict: true,
      })
    );

    const fileProgressMessage = `Validating file ${i + 1}/${filePaths.length}`;
    const journeysProgressMessage = "Journeys added: ";

    process.stdout.write(fileProgressMessage);

    await new Promise((resolve, reject) => {
      stream
        .on("data", (row) => {
          validateJourneyData(row, () => {
            batch.push(row);
            counter++;
            batchCounter++;
            if (batchCounter >= batchSize) {
              stream.pause();
              JourneyModel.insertMany(batch, (err, docs) => {
                if (err) {
                  stream.destroy();
                  reject(err);
                } else {
                  totalJourneys += batchCounter;
                  batch = [];
                  batchCounter = 0;
                  process.stdout.clearLine();
                  process.stdout.cursorTo(0);
                  process.stdout.write(
                    `${fileProgressMessage} - ${journeysProgressMessage}${totalJourneys}`
                  );
                  stream.resume();
                }
              });
            }
          });
        })
        .on("end", () => {
          JourneyModel.insertMany(batch, (err, docs) => {
            if (err) {
              reject(err);
            } else {
              totalJourneys += batchCounter;
              process.stdout.clearLine();
              process.stdout.cursorTo(0);
              resolve();
            }
          });
        })
        .on("error", (error) => {
          reject(error);
        });
    });
  }

  console.log(`🎊 Stream ended!! All journeys added to the database!`);
  console.log(
    "Journey stream started at:",
    startingTime,
    "and ended at:",
    getCurrentTimeInHMSS()
  );
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
