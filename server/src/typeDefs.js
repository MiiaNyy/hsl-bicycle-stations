import { gql } from 'apollo-server';

const typeDefs = gql`

    type Query {
		"Return station by id"
        getStation(id: Int!): Station
        "Returns all stations"
        getStations: Stations!
		"Get as many journeys as the amount is specified"
        getJourneys(page: Int, limit: Int): Journeys!
		"Get a journey by id"
        getJourney(id: ID!): Journey!
    }
	
	type Stations {
		stations: [Station]!
		pagination: Pagination!
    }
	
	type Journeys {
		journeys: [Journey]!
		pagination: Pagination!
    }

    type Station {
		"The id of the station given by the datasource files"
        stationId: Int!
		"The name of the station in English"
		name: String!
		"The address of the station"
		address: String
		"The city that the station is in"
		city: String
		"How many bikes fit in the station"
		capacity: Int!
		"Number of journeys starting from the station"
		numOfJourneysStartingFrom: Int!
		"Number of journeys returning to the station"
		numOfJourneysReturningTo: Int!
		"The average distance of a journey starting from the station in kilometers"
		averageDistanceStartingFrom: Float!
		"The average distance of a journey returning to the station in kilometers"
		averageDistanceReturnedTo: Float!
		"Top 5 most popular return stations for journeys starting from this station"
		mostPopularReturnStationsForJourneysStartingFrom: [Station]!
		"Top 5 most popular departure stations for journeys returning to the station"
		mostPopularDepartureStationsForJourneysReturnedTo: [Station]!
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
	
	type Pagination {
        "The total amount of items"
        totalDocs: Int
        "The amount of items per page"
        limit: Int
		"The amount of pages"
		totalPages: Int
		"The current page"
		page: Int
		"Current page has a next page"
		hasNextPage: Boolean
		"Current page has a previous page"
		hasPrevPage: Boolean
		"The next pages number"
		nextPage: Int
		"The previous pages number"
		prevPage: Int
    }
	
	scalar DateTime
`;

export { typeDefs };
