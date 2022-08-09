import formatSecondsToMSS from "./helpers/formatSecondsToMSS";
import getAverageDistance from "./helpers/getAverageDistance";

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
			const journeysStartingFrom = await journeys.getJourneysStartingFromStation( parent.stationId );
			return journeysStartingFrom.length;
		},
		
		numOfJourneysReturningTo : async (parent, __, { dataSources : { journeys } }) => {
			const journeysReturningTo = await journeys.getJourneysReturnedToStation( parent.stationId );
			return journeysReturningTo.length;
		},
		
		averageDistanceStartingFrom : async (parent, __, { dataSources : { journeys } }) => {
			const journeysStartingFrom = await journeys.getJourneysStartingFromStation( parent.stationId );
			return getAverageDistance( journeysStartingFrom );
		},
		
		averageDistanceReturnedTo : async (parent, __, { dataSources : { journeys } }) => {
			const journeysReturningTo = await journeys.getJourneysReturnedToStation( parent.stationId );
			return getAverageDistance( journeysReturningTo );
		}
	}
	
}



export { resolvers };


