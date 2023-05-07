function getMonthAndDay(date) {
  const departure = new Date(date);
  return `${departure.getDate()}.${departure.getMonth() + 1}`;
}

export default getMonthAndDay;
