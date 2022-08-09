function getMostFrequentIdsAndFrequency (arr) {
	// create hashmap of values and their frequency
	const hashmap = arr.reduce( (acc, val) => {
		acc[val] = ( acc[val] || 0 ) + 1
		return acc
	}, {} );
	
	// change hashmap to array of [value, frequency]
	const entries = Object.entries( hashmap );
	// sort array by frequency
	const sorted = entries.sort( (a, b) => b[1] - a[1] );
	console.log( 'hashmap:', sorted.slice( 0, 5 ) );
	return sorted.slice( 0, 5 ).map( (entry) => entry[0] );
	
}

export default getMostFrequentIdsAndFrequency;
