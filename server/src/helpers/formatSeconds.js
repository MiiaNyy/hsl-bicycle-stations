function formatSeconds(sec) {
  let seconds = parseInt(sec);

  if (seconds >= 3600 && seconds < 86400) {
    // More than one hour less than one day
    return getSecondsToHMSS(seconds);
  }
  if (seconds >= 86400) {
    // More than one day
    return getSecondsToDHMSS(seconds);
  } else if (seconds < 3600) {
    // Less than hour
    return (
      (seconds - (seconds %= 60)) / 60 +
      (9 < seconds ? ":" : ":0") +
      seconds +
      " min"
    );
  }
}

function getSecondsToHMSS(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  const hDisplay = h < 10 ? "0" + h : h;
  const mDisplay = m < 10 ? "0" + m : m;
  const sDisplay = s < 10 ? "0" + s : s;
  return hDisplay + ":" + mDisplay + ":" + sDisplay + "h";
}

function getSecondsToDHMSS(seconds) {
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  const day = d === 1 ? " day, " : " days, ";

  const dDisplay = d > 0 ? d + day : "";
  const hDisplay = h > 0 ? h + ":" : "";
  const mDisplay = m > 0 ? m + ":" : "";

  return dDisplay + hDisplay + mDisplay + s + "h";
}

export default formatSeconds;
