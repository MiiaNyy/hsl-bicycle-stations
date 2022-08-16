import Pagination from "react-bootstrap/Pagination";
import Row from "react-bootstrap/Row";

function PaginationButtons ({ pageSetter, pagination }) {
	
	let active = pagination.page;
	let items = [];
	for ( let number = 1; number <= 5; number++ ) {
		items.push(
			<Pagination.Item key={ number } active={ number === active } onClick={ () => pageSetter( number ) }>
				{ number }
			</Pagination.Item>,
		);
	}
	
	return (
		<Row>
			<Row>
				<Pagination>
					{ pagination.hasPrevPage ?
						<Pagination.Prev onClick={ () => pageSetter( pagination.prevPage ) }/> : null }
					{ items }
					<Pagination.Ellipsis/>
					{ pagination.hasNextPage ?
						<Pagination.Next onClick={ () => pageSetter( pagination.nextPage ) }/> : null }
				</Pagination>
			</Row>
		</Row>
	);
	
}

export default PaginationButtons;
