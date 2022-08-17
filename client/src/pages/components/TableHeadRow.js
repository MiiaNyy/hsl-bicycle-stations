import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import addSpaceBetweenDigits from "../../helpers/addSpaceBetweenDigits";

// How many items are shown in a table
const limitOptions = [10, 25, 50, 75, 100];

function TableHeadRow ({ pagination, tableName, setLimit, currentLimit }) {
	return (
		<Row className="">
			<Col sm className="align-self-sm-end text-sm-start text-center">
				<p className="mb-1">Total { tableName } { addSpaceBetweenDigits( pagination.totalDocs ) }</p>
			</Col>
			<Col sm className="">
				<form className="">
					<Row className="border form-group mb-1 text-end">
						<label htmlFor="inputLimit" className="border col col-form-label">Show</label>
						<Col xs lg="3" className="border">
							<select className="form-select" value={ currentLimit }
									onChange={ (e) => setLimit( e.target.value ) }
									aria-label="Select how many items are shown in a table">
								{ limitOptions.map( limit => <option key={ limit }
																	 value={ limit }>{ limit }</option> ) }
							</select>
						</Col>
					</Row>
				</form>
			</Col>
		</Row>
	);
}

export default TableHeadRow;
