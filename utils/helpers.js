module.exports = {
  format_date: (date) => {
    return date.toLocaleDateString();
  },
  getPlacesKey: () => {
    return process.env.PLACES_KEY;
  },
  format_time: (date) => {
    return date.toLocaleTimeString().slice(0, 5);
  },
  eq: (param1, param2) => {
    if (param1 == param2) return true;
    return false;
  },
  trimText: (text) => {
    if (text.length > 150) {
      return `${text.slice(0, 149)}...`;
    }
    return text;
  },
};
