function getFilterForJourneyQuery(query) {
  // For some reason the time starts at 21:00:00 instead of 00:00:00. That's why we need to start from hour 3.
  const firstDay = new Date(2021, query.month - 1, 1, 3, 0, 0, 0);
  const lastDay = new Date(2021, query.month, 0, 3, 0, 0, 0);

  return {
    departure: {
      $gte: firstDay,
      $lte: lastDay,
    },
  };
}

export default getFilterForJourneyQuery;
