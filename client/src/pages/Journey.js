import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import LoadingSpinner from "./components/LoadingSpinner";
import Error from "./components/Error";

import { Table } from "react-bootstrap";

import TableBorder from "./components/TableBorder";
import TableDataBorder from "./components/TableDataBorder";

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
        longitude
        latitude
      }
      returnStation {
        stationId
        name
        city
        longitude
        latitude
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
  console.log("journey", journey);
  return (
    <Container>
      <div className="text-center journey__container">
        <h2 className="mb-4 ">Single journey</h2>
        <h4>id {journey.id}</h4>

        <div className="journey-basic-data border-radius mt-5 mb-4">
          <p>
            Journey took <strong>{journey.duration}</strong>
          </p>
          <p className="mb-0">
            Travelled Distance <strong>{journey.coveredDistance} km</strong>
          </p>
        </div>
        <Row>
          <StationContainer journey={journey} departure={true} />
          <StationContainer journey={journey} departure={false} />
        </Row>
      </div>
    </Container>
  );
}

function StationContainer({ journey, departure }) {
  const station = departure ? journey.departureStation : journey.returnStation;
  const destinationTime = departure ? journey.departure : journey.return;

  return (
    <Col
      className="mt-3"
      xs={{ span: 12, order: 1 }}
      md={{ span: 6, order: 2 }}
    >
      <TableBorder>
        <Table borderless responsive="xl" className="mb-0 text-center">
          <thead
            className={
              departure
                ? "border-radius accent-background"
                : "border-radius dark-accent-background"
            }
          >
            <tr className="border-bottom-black">
              <th colSpan="2">
                {departure ? "Started" : "Ended"} {formatDate(destinationTime)}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <TableDataBorder>
                <p>At</p>
                {formatTime(destinationTime)}
              </TableDataBorder>
              <td>
                <p>{departure ? "From" : "To"} station</p>
                <a
                  href={"/station/" + station.stationId}
                  className="link-secondary"
                >
                  {" "}
                  {station.name}
                </a>
              </td>
            </tr>
          </tbody>
        </Table>
      </TableBorder>
    </Col>
  );
}

export default Journey;
