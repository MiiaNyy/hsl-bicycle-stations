import { gql } from 'apollo-server';

const typeDefs = gql`
    
    type Query {
        singleStation(id: ID!): Station!
        allStations: [Station]!
        
        getJourneys: [Journey]!
        getJourney(id: ID!): Journey!
        
        insertJourneys: String

    }

    type Station {
        id: ID!
        address: String!
        journeysStartingFrom: Int
        journeysEndingAt: Int
    }

    type Journey {
        id: ID!
        departureTime: String!
        returnTime: String!
        departureStation: Station!
        returnStation: Station!
        "The distance in meters"
        coveredDistance: Int!
        "The duration in seconds"
        duration: Int!
        
        
    }
`;

export { typeDefs };
