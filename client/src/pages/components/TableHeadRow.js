import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import addSpaceBetweenDigits from "../../helpers/addSpaceBetweenDigits";

// How many items are shown in a table
const limitOptions = [10, 25, 50, 75, 100];

function TableHeadRow ({ pagination, tableName, setLimit, currentLimit }) {
	return (
		<Row className="mb-2">
			<Col className="align-self-center">
				<p className="mb-0">Total { addSpaceBetweenDigits( pagination.totalDocs ) }</p>
			</Col>
			<Col xs lg="2">
				<form>
					<select className="form-select" value={ currentLimit }
							onChange={ (e) => setLimit( parseInt( e.target.value ) ) }
							aria-label="Select how many items are shown in a table">
						{ limitOptions.map( limit => <option key={ limit }
															 value={ limit }>{ limit }</option> ) }
					</select>
				</form>
			</Col>
		</Row>
	);
}

export default TableHeadRow;
