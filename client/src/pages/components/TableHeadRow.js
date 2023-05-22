import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import addSpaceBetweenDigits from "../../helpers/addSpaceBetweenDigits";

// How many items are shown in a table
const limitOptions = [10, 25, 50, 75, 100];

const months = [
  { name: "All", value: 0 },
  { name: "Apr", value: 4 },
  { name: "May", value: 5 },
  { name: "Jun", value: 6 },
  { name: "Jul", value: 7 },
  { name: "Aug", value: 8 },
  { name: "Sep", value: 9 },
];

function TableHeadRow(props) {
  const { pagination, setLimit, currentLimit, query, setQuery } = props;
  return (
    <Row className="mb-2">
      <Col sm="12" lg className="align-self-center">
        <p className="mb-0 text-lowercase">
          Total {addSpaceBetweenDigits(pagination.totalDocs)}
        </p>
      </Col>
      <Col xs="6" lg="2" className="align-self-center">
        <DropdownMonth setQuery={setQuery} query={query} />
      </Col>
      <Col xs="6" lg="2">
        <DropdownLimit setLimit={setLimit} currentLimit={currentLimit} />
      </Col>
    </Row>
  );
}

function DropdownLimit({ currentLimit, setLimit }) {
  return (
    <form>
      <select
        className="form-select dropdown text-lowercase"
        value={currentLimit}
        onChange={(e) => setLimit(parseInt(e.target.value))}
        aria-label="Select how many items are shown in a table"
      >
        {limitOptions.map((limit) => (
          <option key={limit} value={limit}>
            {limit}
          </option>
        ))}
      </select>
    </form>
  );
}

function DropdownMonth({ query, setQuery }) {
  return (
    <form>
      <select
        className="form-select dropdown text-lowercase"
        value={query ? query.month : months[0].name}
        onChange={(e) => setQuery({ month: parseInt(e.target.value) })}
        aria-label="Select in which months journeys are shown in a table"
      >
        {months.map((month) => (
          <option key={month.value} value={month.value}>
            {month.name}
          </option>
        ))}
      </select>
    </form>
  );
}

export default TableHeadRow;
