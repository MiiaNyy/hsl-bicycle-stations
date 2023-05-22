import "dotenv/config";
import mongoose from "mongoose";

import { ApolloServer } from "apollo-server";

import { typeDefs } from "./typeDefs.js";
import { resolvers } from "./resolvers.js";

import { Journey as JourneyModel } from "./models/journey.js";
import { Station as StationModel } from "./models/station.js";

import Stations from "./dataSources/stations.js";
import Journeys from "./dataSources/journeys.js";

const url = "mongodb://127.0.0.1:27017/hslBicycles";

const main = async () => {
  await mongoose.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (err) throw err;
    }
  );
};

main()
  .then(() => {
    const db = mongoose.connection;
    db.once("open", (_) => {
      console.log("🎉 Connected to database successfully:", url);
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
