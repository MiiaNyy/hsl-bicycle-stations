import { MongoDataSource } from "apollo-datasource-mongodb";

class Stations extends MongoDataSource {
	
	async getStations (amount) {
		return this.model.find().limit( amount );
	}
	
	async getStation (id) {
		return this.model.findOne( { stationId : id } );
	}
	
	async getMultipleStations (ids) {
		return this.model.find( { stationId : ids } );
	}
}

export default Stations;
