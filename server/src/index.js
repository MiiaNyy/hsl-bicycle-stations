import "dotenv/config";
import mongoose from "mongoose";

import { ApolloServer } from "apollo-server";
import path from "path";

const journeysCsvFilePath1 = path.join(__dirname, "resources/2021-05.csv");
const journeysCsvFilePath2 = path.join(__dirname, "resources/2021-06.csv");
const journeysCsvFilePath3 = path.join(__dirname, "resources/2021-07.csv");

const stationsCsvFilePath = path.join(
  __dirname,
  "resources/Helsingin_ja_Espoon_kaupunkipy%C3%B6r%C3%A4asemat_avoin.csv"
);

const journeysCsvFilePaths = [
  journeysCsvFilePath1,
  journeysCsvFilePath2,
  journeysCsvFilePath3,
];

import { typeDefs } from "./typeDefs.js";
import { resolvers } from "./resolvers.js";

import { Journey as JourneyModel } from "./models/journey.js";
import { Station as StationModel } from "./models/station.js";

import Stations from "./dataSources/stations.js";
import Journeys from "./dataSources/journeys.js";

//import validateStationsAndAddDataToDatabase from "./validation/validateStationsAndAddDataToDatabase";
//import validateJourneysAndAddDataToDatabase from "./validation/validateJourneysAndAddDataToDatabase";

const url = "mongodb://127.0.0.1:27017/hslBicycles";

const main = async () => {
  await mongoose.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (err) throw err;
      console.log(`🎉 Connected to database successfully!!`);

      // Run this only once when the database is created for the first time
      /*validateStationsAndAddDataToDatabase(stationsCsvFilePath);
			
			journeysCsvFilePaths.forEach( async (filePath) => {
			await validateJourneysAndAddDataToDatabase(filePath);
			});*/
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

const dataSources = () => ({
  journeys: new Journeys(JourneyModel),
  stations: new Stations(StationModel),
});

const server = new ApolloServer({ typeDefs, resolvers, dataSources });

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
