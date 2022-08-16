import Pagination from "react-bootstrap/Pagination";
import Row from "react-bootstrap/Row";

function PaginationButtons ({ pageSetter, pagination }) {
	
	let active = pagination.page;
	let items = [];
	
	const totalPages = Math.round( pagination.totalDocs / pagination.limit );
	
	
	const startingPage = pagination.page < 4 ? 1 : ( pagination.page - 2 );
	const endingPage = getEndingPage( pagination.page, totalPages );
	

	
	
	for ( let number = startingPage; number <= endingPage; number++ ) {
		items.push(
			<Pagination.Item key={ number } active={ number === active } onClick={ () => pageSetter( number ) }>
				{ number }
			</Pagination.Item>,
		);
	}
	
	return (
		<Row>
			<Row>
				<p>total pages: { totalPages }</p>
				<Pagination>
					{ pagination.page > 3 ? <Pagination.First onClick={ () => pageSetter( 1 ) }/> : null }
					{ pagination.hasPrevPage ?
						<Pagination.Prev onClick={ () => pageSetter( pagination.prevPage ) }/> : null }
					{ items }
					{ pagination.hasNextPage ?
						<Pagination.Next onClick={ () => pageSetter( pagination.nextPage ) }/> : null }
					{ pagination.page < ( totalPages - 3 ) ?
						<Pagination.Last onClick={ () => pageSetter( totalPages ) }/> : null }
				</Pagination>
			</Row>
		</Row>
	);
	
}


function getEndingPage (currentPage, totalPages) {
	if ( currentPage < 4 ) {
		return 5;
	} else if ( currentPage > totalPages - 3 ) {
		return totalPages;
	}
	return currentPage + 2;
}
export default PaginationButtons;
