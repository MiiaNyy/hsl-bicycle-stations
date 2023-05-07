function getPaginationInfo(results) {
  return {
    totalDocs: results.totalDocs,
    limit: results.limit,
    page: results.page,
    pages: results.pages,
    hasNextPage: results.hasNextPage,
    hasPrevPage: results.hasPrevPage,
    nextPage: results.nextPage,
    prevPage: results.prevPage,
  };
}

export default getPaginationInfo;
