import fs from "fs";
import csv from "csv-parser";

import getCurrentTimeInHMSS from "../helpers/getCurrentTimeInHMSS.js";
import toCamelCase from "../helpers/toCamelCase.js";

import validateStationData from "./validateStationData.js";

import { Station as StationModel } from "../models/station.js";

async function validateStationsAndAddDataToDatabase(filePath) {
  let counter = 0;
  let batchCounter = 0;
  const batchSize = 100;
  const batch = [];

  const startingTime = getCurrentTimeInHMSS();

  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(filePath).pipe(
      csv({
        mapHeaders: ({ header, index }) => {
          header = header.trim();
          return mapStationHeaders(header, index);
        },
        mapValues: ({ header, value }) => {
          return mapStationValues({ header, value });
        },
        strict: true,
      })
    );

    stream
      .on("data", async (row) => {
        await new Promise((innerResolve, innerReject) => {
          validateStationData(row, () => {
            batch.push(row);
            counter++;
            batchCounter++;
            if (batchCounter >= batchSize) {
              stream.pause();
              StationModel.insertMany(batch, (err, docs) => {
                if (err) {
                  innerReject(err);
                  return;
                }
                batch.length = 0;
                batchCounter = 0;
                console.log(`${counter} stations written to database`);
                stream.resume();
                innerResolve();
              });
            } else {
              innerResolve();
            }
          });
        });
      })
      .on("end", async () => {
        try {
          await StationModel.insertMany(batch);
          console.log(
            "🎊 Stream ended!! Station stream started at: " +
              startingTime +
              " and ended" +
              " at: " +
              getCurrentTimeInHMSS()
          );
          resolve();
        } catch (error) {
          reject(error);
        }
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

function mapStationHeaders(header, index) {
  switch (index) {
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
      return toCamelCase(header);
  }
}

function mapStationValues({ header, value }) {
  switch (header) {
    case "stationId":
      return parseInt(value);
    case "capacity":
      return parseInt(value);
    case "longitude":
      return parseFloat(value);
    case "latitude":
      return parseFloat(value);
    default:
      return value;
  }
}

export { validateStationsAndAddDataToDatabase };
