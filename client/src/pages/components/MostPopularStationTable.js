import Container from "react-bootstrap/Container";
import TableBorder from "./TableBorder";
import { Table } from "react-bootstrap";
import TableDataBorder from "./TableDataBorder";
import IconArrowRight from "../../assets/ArrowRight";

function MostPopularStationTable({ stations }) {
  return (
    <Container>
      <TableBorder>
        <Table borderless className="mb-0">
          <thead className="border-bottom border-2 bg-warning">
            <tr>
              <th></th>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {stations.map((station) => (
              <tr key={station.stationId}>
                <TableDataBorder>
                  <a
                    href={"/station/" + station.stationId}
                    className="btn__link"
                  >
                    <IconArrowRight />
                  </a>
                </TableDataBorder>
                <TableDataBorder>{station.stationId}</TableDataBorder>
                <td>{station.name}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableBorder>
    </Container>
  );
}

export default MostPopularStationTable;
