import React, { useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
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
import departureMapMarker from "../assets/map-marker.png";
import returnMapMarker from "../assets/map-marker-dark.png";

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
        <Row className="mt-5">
          <JourneyMap
            departureStation={journey.departureStation}
            returnStation={journey.returnStation}
          />
        </Row>
      </div>
    </Container>
  );
}

function JourneyMap({ departureStation, returnStation }) {
  const iconAttributes = {
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [28, 31],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [40, 30],
  };

  const departureStationIcon = new L.Icon({
    iconUrl: departureMapMarker,
    ...iconAttributes,
  });

  const returnStationIcon = new L.Icon({
    iconUrl: returnMapMarker,
    ...iconAttributes,
  });

  const bounds = [
    [departureStation.latitude, departureStation.longitude],
    [returnStation.latitude, returnStation.longitude],
  ];

  return (
    <MapContainer bounds={bounds} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <StationMarker station={departureStation} icon={departureStationIcon} />
      <StationMarker station={returnStation} icon={returnStationIcon} />
    </MapContainer>
  );
}

function StationMarker({ station, icon }) {
  return (
    <Marker icon={icon} position={[station.latitude, station.longitude]}>
      <Popup>
        <span>
          {station.stationId}, {station.name}
          <br />
          {station.address}
        </span>
      </Popup>
    </Marker>
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
