const resolvers = {
	Query : {
		getJourneys : async (_, { amount }, { dataSources : { journeys } }) => {
			return journeys.getJourneys( amount );
		},
		
		getJourney : async (_, { id }, { dataSources : { journeys } }) => {
			return journeys.getJourney( id );
		},
		singleStation : async (_, { id }, { dataSources : { stations } }) => {
			return stations.getStation( id );
		},
		allStations : async (_, __, { dataSources : { stations } }) => {
			return stations.getStations();
		}
	},
	
	Journey : {
		departureStation : async (journey, __, { dataSources : { stations } }) => {
			return stations.getStation( journey.departureStationId );
		},
		returnStation : async (journey, __, { dataSources : { stations } }) => {
			return stations.getStation( journey.returnStationId );
		}
	}
	
}

export { resolvers };


