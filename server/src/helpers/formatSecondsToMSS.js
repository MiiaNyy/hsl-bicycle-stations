function formatSecondsToMSS (seconds) {
	if ( seconds > 10000 ) {
		console.log("Huge seconds!", seconds);
	}
	return ( seconds - ( seconds %= 60 ) ) / 60 + ( 9 < seconds ? ':' : ':0' ) + seconds;
}

export default formatSecondsToMSS;
