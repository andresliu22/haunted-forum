const { Location } = require('../models/');

const locationData = [
  // id 1
  {
    name: 'Paris, France',
  },
  // id 2
  {
    name: 'Austin, TX, USA',
  },
  // id 3
  {
    name: 'Calgary, Alberta, Canada',
  },
];

const seedLocation = () => Location.bulkCreate(locationData);

module.exports = seedLocation;
