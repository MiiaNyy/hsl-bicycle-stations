import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Table } from "react-bootstrap";

import TableBorder from "./TableBorder";
import TableDataBorder from "./TableDataBorder";

function StationBasicInfo({ station }) {
  return (
    <Container className="text-center station__container mt-4 mt-md-0">
      <div className="mb-3">
        <TableBorder>
          <Table borderless responsive="xl" className="mb-0 text-center">
            <thead className="border-radius accent-background">
              <tr className="border-bottom-black">
                <th>address</th>
                <th>city</th>
                <th>Capacity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <TableDataBorder>{station.address}</TableDataBorder>
                <TableDataBorder>
                  {typeof station.city === "undefined" || !station.city.trim()
                    ? "unknown"
                    : station.city}
                </TableDataBorder>
                <td>{station.capacity}</td>
              </tr>
            </tbody>
          </Table>
        </TableBorder>
      </div>

      <div className="mb-3">
        <TableBorder>
          <Table borderless responsive="xl" className="mb-0 text-center">
            <thead className="border-radius accent-background">
              <tr className="border-bottom-black">
                <th colSpan="2">total number of...</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <TableDataBorder>
                  <p>departing journeys</p>
                  {station.numOfJourneysStartingFrom}
                </TableDataBorder>
                <td>
                  <p>returning journeys</p>
                  {station.numOfJourneysReturningTo}
                </td>
              </tr>
            </tbody>
          </Table>
        </TableBorder>
      </div>

      <TableBorder>
        <Table borderless responsive="xl" className="mb-0 text-center">
          <thead className="border-radius accent-background">
            <tr className="border-bottom-black">
              <th colSpan="2">Average distance travelled...</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <TableDataBorder>
                <p>from here</p>
                {station.averageDistanceStartingFrom}km
              </TableDataBorder>
              <td>
                <p>to here</p>
                {station.averageDistanceReturnedTo}km
              </td>
            </tr>
          </tbody>
        </Table>
      </TableBorder>
    </Container>
  );
}

export default StationBasicInfo;
