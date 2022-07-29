import { DateTimeScalar } from 'graphql-date-scalars';


const journeys = [
    {
        id: 1,
        departureTime: "2021-05-31T23:57:25",
        returnTime: "2021-06-01T00:05:46",
        departureStation: {
            id: 94,
            address: "Laajalahden aukio",
            journeysStartingFrom: 1,
            journeysEndingAt: 0
        },
        returnStation: {
            id: 100,
            address: "Teljäntie",
            journeysStartingFrom: 0,
            journeysEndingAt: 1
        },
        coveredDistance: 2043,
        duration: 500
    }
];

const resolvers = {
    DateTime: DateTimeScalar,
    
    Query: {
        getJourneys: () => {
            return journeys;
        },
        getJourney: (_, { id }) => {
            return journeys.find( journey => journey.id === id );
        }
    }
}

export { resolvers };


