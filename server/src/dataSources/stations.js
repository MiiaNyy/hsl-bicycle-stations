import { MongoDataSource } from "apollo-datasource-mongodb";

class Stations extends MongoDataSource {
	async getStations () {
		return this.model.find();
	}
	
	async getStation (id) {
		return this.model.findById( id );
	}
}

export default Stations;
