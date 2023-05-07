function getAverageDistance(journeys) {
  const totalDistance = journeys.reduce(
    (acc, journey) => acc + journey.coveredDistance,
    0
  );
  const averageInKM = totalDistance / journeys.length / 1000;
  return parseFloat(averageInKM.toFixed(2)); // 2 decimal places
}

export default getAverageDistance;
