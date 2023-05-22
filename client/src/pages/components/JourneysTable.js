import { gql, useQuery } from "@apollo/client";

import { Table } from "react-bootstrap";
import Container from "react-bootstrap/Container";

import { useState } from "react";

import PaginationButtons from "./PaginationButtons";
import TableHeadRow from "./TableHeadRow";
import TableBorder from "./TableBorder";
import TableDataBorder from "./TableDataBorder";
import LoadingSpinner from "./LoadingSpinner";
import Error from "./Error";
import getMonthAndDay from "../../helpers/getMonthAndDay";
import IconArrowRight from "../../assets/ArrowRight";

const GET_JOURNEYS = gql`
  query Query(
    $page: Int
    $limit: Int
    $query: JourneyQuery
    $sort: JourneySort
  ) {
    getJourneys(page: $page, limit: $limit, query: $query, sort: $sort) {
      journeys {
        id
        coveredDistance
        duration
        departure
        departureStation {
          stationId
          name
        }
        returnStation {
          stationId
          name
        }
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

function JourneysTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState({});
  const [sort, setSort] = useState({ field: "departure", value: "asc" });

  const [duration, setDuration] = useState("asc");
  const [distance, setDistance] = useState("asc");

  const { loading, error, data } = useQuery(GET_JOURNEYS, {
    variables: {
      page: currentPage,
      limit: limit,
      query: query,
      sort: sort,
    },
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <Error error={error} />;

  const journeys = data.getJourneys.journeys;
  const pagination = data.getJourneys.pagination;

  return (
    <>
      <h2 className="mb-4">Journeys</h2>
      <Container>
        <TableHeadRow
          pagination={pagination}
          setLimit={setLimit}
          currentLimit={limit}
          query={query}
          setQuery={setQuery}
        />
        <TableBorder>
          <Table borderless responsive="xl" className="mb-0 text-center">
            <thead className="border-radius accent-background">
              <tr className="border-bottom-black">
                <th></th>

                <th>Date</th>
                <th>Covered Distance</th>
                <th>Duration</th>
                <th>Departure station</th>
                <th>Return station</th>
              </tr>
            </thead>
            <tbody>
              {journeys.map((journey) => (
                <TableRow key={journey.id} journey={journey} />
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

function TableRow({ journey }) {
  const departureStation = journey.departureStation;
  const returnStation = journey.returnStation;

  return (
    <tr key={journey.id}>
      <TableDataBorder>
        <a href={"/journey/" + journey.id} className="btn__link">
          <IconArrowRight></IconArrowRight>
        </a>
      </TableDataBorder>
      <TableDataBorder>
        <p className="m-1">{getMonthAndDay(journey.departure)}</p>
      </TableDataBorder>
      <TableDataBorder>
        <p className="m-1">{journey.coveredDistance} km</p>
      </TableDataBorder>
      <TableDataBorder>{journey.duration}</TableDataBorder>
      <TableDataBorder>
        <a
          href={"/station/" + departureStation.stationId}
          className="link-secondary"
        >
          {departureStation.name}
        </a>
      </TableDataBorder>
      <td>
        <a
          href={"/station/" + returnStation.stationId}
          className="link-secondary"
        >
          {returnStation.name}
        </a>
      </td>
    </tr>
  );
}

export default JourneysTable;
