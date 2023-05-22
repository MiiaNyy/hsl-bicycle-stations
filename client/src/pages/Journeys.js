import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import JourneysTable from "./components/JourneysTable";

function Journeys() {
  return (
    <>
      <Container>
        <Row className="mt-2">
          <h2 className="mb-5 mt-3 text-center">Journeys</h2>
          <JourneysTable />
        </Row>
      </Container>
    </>
  );
}

export default Journeys;
