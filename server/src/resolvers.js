
const resolvers = {
    Query: {
        getJourneys: async (_, _args, { dataSources: { journeys } }) => {
            return journeys.getJourneys();
        },
        
        getJourney: async (_, { id }, { dataSources: { journeys } }) => {
            return journeys.getJourney( id );
        },
        
    }
}

export { resolvers };


