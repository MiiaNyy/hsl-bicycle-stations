function getCurrentTimeInHMSS() {
	const today = new Date();
	return today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
}

export default getCurrentTimeInHMSS;
