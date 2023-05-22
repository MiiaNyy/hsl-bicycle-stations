import { gql, useQuery } from "@apollo/client";

import { useState } from "react";

import { Table } from "react-bootstrap";
import Container from "react-bootstrap/Container";

import TableBorder from "./TableBorder";
import TableDataBorder from "./TableDataBorder";
import LoadingSpinner from "./LoadingSpinner";

import Error from "./Error";
import PaginationButtons from "./PaginationButtons";
import TableHeadRow from "./TableHeadRow";
import AllStationsOnMap from "./AllStationsOnMap";
import IconArrowRight from "../../assets/ArrowRight";

const GET_STATIONS = gql`
  query Query($page: Int, $limit: Int) {
    getStations(page: $page, limit: $limit) {
      stations {
        stationId
        name
        capacity
        city
        longitude
        latitude
      }
      pagination {
        totalDocs
        limit
        totalPages
        page
        hasNextPage
        hasPrevPage
        nextPage
        prevPage
      }
    }
  }
`;

function StationsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { loading, error, data } = useQuery(GET_STATIONS, {
    variables: {
      page: currentPage,
      limit: limit,
    },
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <Error error={error} />;

  const stations = data.getStations.stations;
  const pagination = data.getStations.pagination;

  return (
    <>
      <Container>
        <h2>Stations</h2>
        <TableHeadRow
          pagination={pagination}
          setLimit={setLimit}
          tableName={"stations"}
          currentLimit={limit}
        />
        <AllStationsOnMap />

        <TableBorder>
          <Table borderless responsive="xl" className="mb-0 text-center">
            <thead className="border-radius accent-background">
              <tr className="border-bottom-black">
                <th></th>
                <th>ID</th>
                <th>Name</th>
                <th>City</th>
                <th>Capacity</th>
              </tr>
            </thead>
            <tbody>
              {stations.map((station) => (
                <TableRow
                  key={station.stationId + Math.random()}
                  station={station}
                />
              ))}
            </tbody>
          </Table>
        </TableBorder>
        <PaginationButtons
          pageSetter={setCurrentPage}
          pagination={pagination}
        />
      </Container>
    </>
  );
}

function TableRow({ station }) {
  return (
    <tr key={station.stationId + Math.random()}>
      <TableDataBorder>
        <a href={"/station/" + station.stationId} className="btn__link">
          <IconArrowRight />
        </a>
      </TableDataBorder>
      <TableDataBorder>{station.stationId}</TableDataBorder>
      <TableDataBorder>{station.name}</TableDataBorder>
      <TableDataBorder>{station.city}</TableDataBorder>
      <td>{station.capacity}</td>
    </tr>
  );
}

export default StationsTable;
