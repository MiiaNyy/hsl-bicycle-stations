import { MongoDataSource } from "apollo-datasource-mongodb";

class Journeys extends MongoDataSource {
    async getJourneys (amount) {
        return this.model.find().limit( amount );
    }
    
    async getJourney (id) {
		console.log('journeys id is:', id);
        return this.model.findById( id );
    }
	
	async getJourneysStartingFromStation (stationId) {
		return this.model.find( { departureStationId : stationId } );
	}
	
	async getJourneysReturnedToStation (stationId) {
		return this.model.find( { returnStationId : stationId } );
	}
}

export default Journeys;
