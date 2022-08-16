import { MongoDataSource } from "apollo-datasource-mongodb";

import getPaginationInfo from "../helpers/getPaginationInfo";

const options = {
	page : 1,
	limit : 10,
	collation : {
		locale : 'en',
	},
};



class Stations extends MongoDataSource {
	
	async getStations () {
		return this.model.paginate( {}, options, async (err, result) => {
			if ( err ) {
				console.log( err );
			}
			return {
				stations: result.docs,
				pagination: getPaginationInfo(result),
			}
		} );
	}
	
	async getStation (id) {
		return this.model.findOne( { stationId : id } );
	}
	
	async getMultipleStations (ids) {
		return this.model.find( { stationId : ids } );
	}
}

export default Stations;
