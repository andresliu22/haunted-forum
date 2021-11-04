const e = require("express");

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
  trimText: (text) => {
    if (text.length > 150) {
      return `${text.slice(0, 149)}...`;
    }
    return text;
  },
  isEmpty: (array) => {
    if (array.length === 0) return true;
    return false;
  },
  sortAlpha: (arr) => {
    let obj = {};
    arr.forEach((location) => {
      if (obj[location.name[0]]) {
        obj[location.name[0]].push({
          nameId: location.name[0],
          name: location.name,
          id: location.id,
        });
      } else {
        obj[location.name[0]] = [
          { nameId: location.name[0], name: location.name, id: location.id },
        ];
      }
    });
    return obj;
  },
};
