import { MongoDataSource } from "apollo-datasource-mongodb";
import getPaginationInfo from "../helpers/getPaginationInfo";
import getFilterForJourneyQuery from "../helpers/getFilterForJourneyQuery";
import { re } from "@babel/core/lib/vendor/import-meta-resolve";

function objIsEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function getSortObj(obj) {
  const key = obj.field;
  const value = obj.value;

  if (key === "duration") return { duration: value };
  if (key === "coveredDistance") return { coveredDistance: value };
  if (key === "departure") return { departure: value };
}

class Journeys extends MongoDataSource {
  async getJourneys(page, limit, query, sort) {
    // Check if there are any filters to query
    // There is not any filters for this query
    const journeyQuery = objIsEmpty(query)
      ? query
      : getFilterForJourneyQuery(query);
    const journeySort = getSortObj(sort);

    console.log("journeySort:", journeySort);

    const options = {
      page,
      limit,
      sort: journeySort,
      collation: { locale: "en" },
    };
    return this.model.paginate(journeyQuery, options, async (err, result) => {
      if (err) {
        throw err;
      }
      return {
        journeys: result.docs,
        pagination: getPaginationInfo(result),
      };
    });
  }

  async getJourney(id) {
    return this.model.findById(id);
  }

  async getJourneysStartingFromStation(stationId) {
    return this.model.find({ departureStationId: stationId });
  }

  async getJourneysReturnedToStation(stationId) {
    return this.model.find({ returnStationId: stationId });
  }
}

export default Journeys;
