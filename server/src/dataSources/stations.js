import { MongoDataSource } from "apollo-datasource-mongodb";

class Stations extends MongoDataSource {
	async getStations () {
		return this.model.find();
	}
	
	async getStation (stationId) {
		return this.model.findOne( { stationId } );
	}
	
	async getMultipleStations (stationIds) {
		return this.model.find( { stationId : stationIds } );
	}
}

export default Stations;
