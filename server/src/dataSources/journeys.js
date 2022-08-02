import { MongoDataSource } from "apollo-datasource-mongodb";

class Journeys extends MongoDataSource {
    async getJourneys () {
        return this.model.find();
    }
    
    async getJourney (id) {
        return this.findById( id );
    }
    
}

export default Journeys;
