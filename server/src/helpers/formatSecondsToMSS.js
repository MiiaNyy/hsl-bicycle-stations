function fmtMSS (s) {return ( s - ( s %= 60 ) ) / 60 + ( 9 < s ? ':' : ':0' ) + s}

function formatSecondsToMSS (seconds) {
	return ( seconds - ( seconds %= 60 ) ) / 60 + ( 9 < seconds ? ':' : ':0' ) + seconds;
}

export default formatSecondsToMSS;
