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
    Query: {
        getJourneys: async (_, _args, { dataSources: { journeys } }) => {
            return journeys.getJourneys();
        },
        
        getJourney: async (_, { id }, { dataSources: { journeys } }) => {
            return journeys.getJourney( id );
        }
    }
}

export { resolvers };


