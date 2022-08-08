import { gql } from 'apollo-server';

const typeDefs = gql`

    type Query {
        singleStation(id: ID!): Station!
        allStations: [Station]!
		"Get all journeys depending on the amount"
        getJourneys(amount:Int!): [Journey]!
        getJourney(id: ID!): Journey!
    }

    type Station {
        id: Int!
        address: String!
        journeysStartingFrom: Int
        journeysEndingAt: Int
    }

	
    type Journey {
        id: ID!
        departure: DateTime!
        return: DateTime!
        departureStationId: Int!
        returnStationId: Int!
        "The distance in meters"
        coveredDistance: Int!
        "The duration in seconds"
        duration: Int!
    }
	
	scalar DateTime
`;

export { typeDefs };
