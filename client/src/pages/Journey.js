import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoadingSpinner from "./components/LoadingSpinner";
import Error from "./components/Error";

const GET_JOURNEY = gql`
  query Query($getJourneyId: ID!) {
    getJourney(id: $getJourneyId) {
      id
      departure
      return
      departureStation {
        stationId
        name
        city
      }
      returnStation {
        stationId
        name
        city
      }
      coveredDistance
      duration
    }
  }
`;

function formatDate(date) {
  return new Date(date).toISOString().split("T")[0];
}

function formatTime(date) {
  return new Date(date).toISOString().split("T")[1].split(".")[0];
}

function Journey() {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_JOURNEY, {
    variables: { getJourneyId: id },
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <Error error={error} />;

  const journey = data.getJourney;

  return (
    <div className="text-center">
      <h1 className="mb-4 ">Single journey</h1>
      <p>
        {" "}
        ID <em>{journey.id}</em>
      </p>
      <StationContainer journey={journey} departure={true} />
      <Row className="mt-4 mb-4">
        <h4>Journey took {journey.duration} minutes</h4>
      </Row>
      <StationContainer journey={journey} departure={false} />
      <Row className="mt-4 mb-4">
        <h4>Travelled Distance {journey.coveredDistance} km</h4>
      </Row>
    </div>
  );
}

function StationContainer({ journey, departure }) {
  const station = departure ? journey.departureStation : journey.returnStation;
  const destinationTime = departure ? journey.departure : journey.return;

  return (
    <Row className="border border-2 border-warning rounded mt-2 box-shadow">
      <h4 className="pt-2 pb-2">
        {departure ? "Started" : "Ended"} {formatDate(destinationTime)}
      </h4>
      <Col className="border-end border-warning">
        <p className="info-header">At</p>
        <p>{formatTime(destinationTime)}</p>
      </Col>
      <Col className=" border-warning">
        <p className="info-header">{departure ? "From" : "To"} station</p>
        <p>
          <a href={"/station/" + station.stationId} className="link-secondary">
            {" "}
            {station.name}
          </a>
        </p>
      </Col>
    </Row>
  );
}

export default Journey;
