import "dotenv/config";
import mongoose from "mongoose";

import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(path.dirname(__filename));

const journeysCsvFilePath1 = path.join(__dirname, "src/resources/2021-05.csv");
const journeysCsvFilePath2 = path.join(__dirname, "src/resources/2021-06.csv");
const journeysCsvFilePath3 = path.join(__dirname, "src/resources/2021-07.csv");

const stationsCsvFilePath = path.join(
  __dirname,
  "src/resources/Helsingin_ja_Espoon_kaupunkipy%C3%B6r%C3%A4asemat_avoin.csv"
);

const journeysCsvFilePaths = [
  journeysCsvFilePath1,
  journeysCsvFilePath2,
  journeysCsvFilePath3,
];

import { validateStationsAndAddDataToDatabase } from "../src/validation/validateStationsAndAddDataToDatabase.js";
import validateJourneysAndAddDataToDatabase from "../src/validation/validateJourneysAndAddDataToDatabase.js";

const url = "mongodb://127.0.0.1:27017/hslBicycles";

async function validateAllJourneys() {
  try {
    await Promise.all(
      journeysCsvFilePaths.map(async (filePath) => {
        await validateJourneysAndAddDataToDatabase(filePath);
      })
    );
    console.log("All journeys validated successfully!");
  } catch (error) {
    console.error("Error occurred during journey validation:", error);
    process.exit(1);
  }
}

const main = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`🎉 Connected to the database successfully!`);

    await validateStationsAndAddDataToDatabase(stationsCsvFilePath);
    await validateJourneysAndAddDataToDatabase(journeysCsvFilePaths);
    console.log(`Validation and database insertion completed successfully!`);

    process.exit();
  } catch (error) {
    console.error(
      `Error occurred during validation and database insertion:`,
      error
    );
    process.exit(1);
  }
};

const db = mongoose.connection;
db.once("open", (_) => {
  console.log(`Database connected: ${url}`);
});

db.on("error", (err) => {
  console.error(`Connection error:`, err);
});

main();
