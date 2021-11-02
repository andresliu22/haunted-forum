module.exports = {
  format_date: (date) => {
    return date.toLocaleDateString();
  },
  getPlacesKey: () => {
    return process.env.PLACES_KEY;
  },
};