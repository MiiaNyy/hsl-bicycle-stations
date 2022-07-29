import { gql } from 'apollo-server';

const typeDefs = gql`
    
    scalar DateTime
    
    type Query {
        singleStation(id: ID!): Station!
        allStations: [Station]!
        
        getJourneys: [Journey]!
        getJourney(id: ID!): Journey!

    }

    type Station {
        id: ID!
        address: String!
        journeysStartingFrom: Int
        journeysEndingAt: Int
    }

    type Journey {
        id: ID!
        departureTime: DateTime!
        returnTime: DateTime!
        departureStation: Station!
        returnStation: Station!
        "The distance in meters"
        coveredDistance: Int!
        "The duration in seconds"
        duration: Int!
        
        
    }
`;

export { typeDefs };
