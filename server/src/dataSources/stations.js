import { MongoDataSource } from "apollo-datasource-mongodb";

import getPaginationInfo from "../helpers/getPaginationInfo";

class Stations extends MongoDataSource {
  async getStations(page = 1, limit = 10) {
    return this.model.paginate(
      {},
      { page, limit, collation: { locale: "en" } },
      async (err, result) => {
        if (err) {
          console.log(err);
        }
        return {
          stations: result.docs,
          pagination: getPaginationInfo(result),
        };
      }
    );
  }

  async getStation(id) {
    return this.model.findOne({ stationId: id });
  }

  async getMultipleStations(ids) {
    return this.model.find({ stationId: ids });
  }

  async getAllStations() {
    return this.model.find();
  }
}

export default Stations;
