import { gql } from 'apollo-server';

const typeDefs = gql`

    type Query {
		"Return station by id"
        getStation(stationId: Int!): Station
        "Returns all stations"
        getStations: [Station]!
		"Get as many journeys as the amount is specified"
        getJourneys(amount:Int!): [Journey]!
		"Get a journey by id"
        getJourney(id: ID!): Journey!
    }

    type Station {
		"The id of the station given by the datasource files"
        stationId: Int!
		"The name of the station in Finnish"
		nameFIN: String!
		"The name of the station in Swedish"
		nameSWE: String!
		"The name of the station in English"
		nameENG: String!
		"The address of the station in Finnish"
		addressFIN: String
		"The address of the station in Swedish"
		addressSWE: String
		"The city of the station in Finnish"
		cityFIN: String
		"The city of the station in Swedish"
		citySWE: String
		"How many bikes fit in the station"
		capacity: Int!
		numOfJourneysStartingFrom: Int!
		numOfJourneysReturningTo: Int!
		"The longitude of the station"
		longitude: Float!
		"The latitude of the station"
		latitude: Float!
		
    }

	
    type Journey {
        id: ID!
		"Journeys departure time"
        departure: DateTime!
		"Journeys return time"
        return: DateTime!
		"Station where the journey starts"
		departureStation: Station!
		"Station where the journey ends"
        returnStation: Station!
        "The journeys covered distance in kilometers"
        coveredDistance: Float!
        "The journeys duration in minutes"
        duration: String!
    }
	
	scalar DateTime
`;

export { typeDefs };
