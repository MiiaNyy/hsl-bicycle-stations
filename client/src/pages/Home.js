import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import JourneysTable from "./components/JourneysTable";
import StationsTable from "./components/StationsTable";
import AllStationsOnMap from "./components/AllStationsOnMap";

function Home() {
  return (
    <Container>
      <header className="text-center mx-auto">
        <h1>
          Helsinki and Espoo city bicycle journeys and stations during May to
          July 2021.
        </h1>
      </header>

      <Row sm style={{ minHeight: "400px" }}>
        <JourneysTable />
      </Row>
      <Row className="pb-5 mb-5" style={{ minHeight: "400px" }}>
        <StationsTable />
      </Row>
    </Container>
  );
}

export default Home;
