import { gql } from 'apollo-server';

const typeDefs = gql`

    type Query {
        singleStation(id: Int!): Station!
        allStations: [Station]!
		"Get all journeys depending on the amount"
        getJourneys(amount:Int!): [Journey]!
        getJourney(id: ID!): Journey!
    }

    type Station {
        stationId: Int!
		nameFIN: String!
		nameSWE: String!
		nameENG: String!
		addressFIN: String!
		addressSWE: String!
		cityFIN: String
		citySWE: String
		capacity: Int!
		longitude: Float!
		latitude: Float!
    }

	
    type Journey {
        id: ID!
        departure: DateTime!
        return: DateTime!
        departureStationId: Int!
		returnStationId: Int!
		departureStation: Station!
        returnStation: Station!
        "The distance in meters"
        coveredDistance: Int!
        "The duration in seconds"
        duration: Int!
    }
	
	scalar DateTime
`;

export { typeDefs };
