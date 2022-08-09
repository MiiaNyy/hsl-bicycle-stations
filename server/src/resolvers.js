import formatSecondsToMSS from "./helpers/formatSecondsToMSS";

const resolvers = {
	Query : {
		getJourneys : async (_, { amount }, { dataSources : { journeys } }) => {
			return journeys.getJourneys( amount );
		},
		
		getJourney : async (_, { id }, { dataSources : { journeys } }) => {
			return journeys.getJourney( id );
		},
		
		getStation : async (_, { stationId }, { dataSources : { stations } }) => {
			console.log('station id is:', stationId);
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
			console.log( "parent.departureStationId: " + parent.departureStationId );
			return stations.getStation( parent.departureStationId );
		},
		returnStation : async (parent, __, { dataSources : { stations } }) => {
			return stations.getStation( parent.returnStationId );
		},
	}
	
}

export { resolvers };


