
// For better readability, add a space between digits in a string.
function addSpaceBetweenDigits ( num ) {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export default addSpaceBetweenDigits;
