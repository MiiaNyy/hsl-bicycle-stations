import { gql } from 'apollo-server';

const typeDefs = gql`
    type Query {
        singleStation(id: ID!): Station
        allStations: [Station]
        journeys: [Journey]!

    }

    type Station {
        id: ID!
        name: String!
        address: String!
        journeysStartingFrom: Int!
        journeysEndingAt: Int!
    }

    type Journey {
        id: ID!
        startStation: Station!
        endStation: Station!
        startTime: String!
        endTime: String!
        duration: Float!
        distance: Float!
    }
`;

export { typeDefs };
