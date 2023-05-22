import formatSeconds from "./helpers/formatSeconds.js";
import getAverageDistance from "./helpers/getAverageDistance.js";
import getMostFrequentIds from "./helpers/getMostFrequentIds.js";

const resolvers = {
  Query: {
    getJourneys: async (_, { page, limit, query, sort }, { dataSources }) => {
      return dataSources.journeys.getJourneys(page, limit, query, sort);
    },

    getJourney: async (_, { id }, { dataSources: { journeys } }) => {
      return journeys.getJourney(id);
    },

    getStation: async (_, { id }, { dataSources: { stations } }) => {
      return stations.getStation(id);
    },

    getStations: async (_, { page, limit }, { dataSources: { stations } }) => {
      return stations.getStations(page, limit);
    },

    getAllStations: async (_, __, { dataSources: { stations } }) => {
      return stations.getAllStations();
    },
  },

  Journey: {
    coveredDistance: async (parent) => {
      return parent.coveredDistance / 1000;
    },

    duration: async (parent) => {
      return formatSeconds(parent.duration);
    },

    departureStation: async (parent, __, { dataSources: { stations } }) => {
      return stations.getStation(parent.departureStationId);
    },
    returnStation: async (parent, __, { dataSources: { stations } }) => {
      if (!parent.returnStationId) {
        console.log("Null station id found! From parent:", parent.id);
      }
      return stations.getStation(parent.returnStationId);
    },
  },

  Station: {
    name: async (parent) => {
      return parent.nameENG;
    },

    address: async (parent) => {
      return parent.addressFIN;
    },

    city: async (parent) => {
      return parent.cityFIN;
    },

    numOfJourneysStartingFrom: async (
      parent,
      __,
      { dataSources: { journeys } }
    ) => {
      const journeysDepartingFrom =
        await journeys.getJourneysStartingFromStation(parent.stationId);
      return journeysDepartingFrom.length;
    },

    numOfJourneysReturningTo: async (
      parent,
      __,
      { dataSources: { journeys } }
    ) => {
      const journeysReturningTo = await journeys.getJourneysReturnedToStation(
        parent.stationId
      );
      return journeysReturningTo.length;
    },

    averageDistanceStartingFrom: async (
      parent,
      __,
      { dataSources: { journeys } }
    ) => {
      const journeysDepartingFrom =
        await journeys.getJourneysStartingFromStation(parent.stationId);
      return getAverageDistance(journeysDepartingFrom);
    },

    averageDistanceReturnedTo: async (
      parent,
      __,
      { dataSources: { journeys } }
    ) => {
      const journeysReturningTo = await journeys.getJourneysReturnedToStation(
        parent.stationId
      );
      return getAverageDistance(journeysReturningTo);
    },

    mostPopularReturnStationsForJourneysStartingFrom: async (
      parent,
      __,
      { dataSources: { journeys, stations } }
    ) => {
      const journeysDepartingFrom =
        await journeys.getJourneysStartingFromStation(parent.stationId);
      const journeysReturnStationIds = journeysDepartingFrom.map(
        (journey) => journey.returnStationId
      );
      const mostPopularStationIds = getMostFrequentIds(
        journeysReturnStationIds
      );
      return stations.getMultipleStations(mostPopularStationIds);
    },

    mostPopularDepartureStationsForJourneysReturnedTo: async (
      parent,
      __,
      { dataSources: { journeys, stations } }
    ) => {
      const journeysReturningTo = await journeys.getJourneysReturnedToStation(
        parent.stationId
      );
      const journeysDepartStationIds = journeysReturningTo.map(
        (journey) => journey.departureStationId
      );
      const mostPopularStationIds = getMostFrequentIds(
        journeysDepartStationIds
      );
      return stations.getMultipleStations(mostPopularStationIds);
    },
  },
};

export { resolvers };
