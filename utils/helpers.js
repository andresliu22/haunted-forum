module.exports = {
  format_date: (date) => {
    return date.toLocaleDateString();
  },
  getPlacesKey: () => {
    return process.env.PLACES_KEY;
  },
  format_time: (date) => {
    return date.toLocaleTimeString();
  },
  eq: (param1, param2) => {
    if (param1 == param2) return true;
    return false;
  },
};
