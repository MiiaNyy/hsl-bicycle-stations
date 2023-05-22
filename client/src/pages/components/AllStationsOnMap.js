import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";

import Container from "react-bootstrap/Container";
import { gql, useQuery } from "@apollo/client";

import LoadingSpinner from "./LoadingSpinner";
import Error from "./Error";
import mapMarker from "../../assets/map-marker.png";

const GET_ALL_STATIONS = gql`
  query Query {
    getAllStations {
      stationId
      name
      longitude
      latitude
      address
    }
  }
`;
// Position in Kumpula Helsinki. From this position all the station markers are shown.
const centerPosition = [60.20876159060835, 24.945689345540597];

const customIcon = new L.Icon({
  iconUrl: mapMarker,
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [28, 31],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [40, 30],
});

function AllStationsOnMap() {
  const { loading, error, data } = useQuery(GET_ALL_STATIONS);

  if (loading) return <LoadingSpinner />;
  if (error) return <Error error={error} />;

  const stations = data.getAllStations;

  return (
    <Container className="mb-4 p-0">
      <MapContainer
        preferCanvas={true}
        renderer={L.canvas()}
        center={centerPosition}
        zoom={11}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapMarkers stations={stations} />
      </MapContainer>
    </Container>
  );
}

function MapMarkers({ stations }) {
  return stations.map((station, index) => {
    const position = [station.latitude, station.longitude];
    return (
      <Marker icon={customIcon} position={position} key={index}>
        <Popup>
          <a href={"/station/" + station.stationId}>
            {station.stationId}, {station.name}
            <br />
            {station.address}
          </a>
        </Popup>
      </Marker>
    );
  });
}

export default AllStationsOnMap;
