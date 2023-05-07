import "dotenv/config";
import mongoose from "mongoose";

import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(path.dirname(__filename));

console.log("dirname", __dirname);

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
  await Promise.all(
    journeysCsvFilePaths.map(async (filePath) => {
      await validateJourneysAndAddDataToDatabase(filePath);
    })
  );

  /*await journeysCsvFilePaths.forEach( async (filePath) => {
    await validateJourneysAndAddDataToDatabase(filePath);
    });*/
}
const main = async () => {
  await mongoose.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    async (err) => {
      if (err) throw err;
      console.log(`🎉 Connected to database successfully!!`);

      // Run this only once when the database is created for the first time
      await validateStationsAndAddDataToDatabase(stationsCsvFilePath);
      await validateAllJourneys();
      //process.exit();
    }
  );
};

main()
  .then(() => {
    const db = mongoose.connection;
    db.once("open", (_) => {
      console.log("Database connected:", url);
    });

    db.on("error", (err) => {
      console.error("connection error:", err);
    });
  })
  .catch((error) => console.error(error));
