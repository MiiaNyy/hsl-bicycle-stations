import formatSecondsToMSS from "./helpers/formatSecondsToMSS";
import getAverageDistance from "./helpers/getAverageDistance";
import getMostFrequentIds from "./helpers/getMostFrequentIds";

const resolvers = {
	Query : {
		getJourneys : async (_, { amount }, { dataSources : { journeys } }) => {
			return journeys.getJourneys( amount );
		},
		
		getJourney : async (_, { id }, { dataSources : { journeys } }) => {
			return journeys.getJourney( id );
		},
		
		getStation : async (_, { stationId }, { dataSources : { stations } }) => {
			return stations.getStation( stationId );
		},
		
		getStations : async (_, __, { dataSources : { stations } }) => {
			return stations.getStations();
		}
	},
	
	Journey : {
		coveredDistance : async (parent) => {
			return parent.coveredDistance / 1000;
		},
		
		duration : async (parent) => {
			return formatSecondsToMSS( parent.duration );
		},
		
		departureStation : async (parent, __, { dataSources : { stations } }) => {
			return stations.getStation( parent.departureStationId );
		},
		returnStation : async (parent, __, { dataSources : { stations } }) => {
			return stations.getStation( parent.returnStationId );
		},
	},
	
	Station : {
		numOfJourneysStartingFrom : async (parent, __, { dataSources : { journeys } }) => {
			const journeysDepartingFrom = await journeys.getJourneysStartingFromStation( parent.stationId );
			return journeysDepartingFrom.length;
		},
		
		numOfJourneysReturningTo : async (parent, __, { dataSources : { journeys } }) => {
			const journeysReturningTo = await journeys.getJourneysReturnedToStation( parent.stationId );
			return journeysReturningTo.length;
		},
		
		averageDistanceStartingFrom : async (parent, __, { dataSources : { journeys } }) => {
			const journeysDepartingFrom = await journeys.getJourneysStartingFromStation( parent.stationId );
			return getAverageDistance( journeysDepartingFrom );
		},
		
		averageDistanceReturnedTo : async (parent, __, { dataSources : { journeys } }) => {
			const journeysReturningTo = await journeys.getJourneysReturnedToStation( parent.stationId );
			return getAverageDistance( journeysReturningTo );
		},
		
		mostPopularReturnStationsForJourneysStartingFrom : async (parent, __, { dataSources : { journeys, stations } }) => {
			const journeysDepartingFrom = await journeys.getJourneysStartingFromStation( parent.stationId );
			const journeysReturnStationIds = journeysDepartingFrom.map( journey => journey.returnStationId );
			const mostPopularStationIds = getMostFrequentIds( journeysReturnStationIds );
			return stations.getMultipleStations( mostPopularStationIds );
		}
	}
	
}


export { resolvers };


