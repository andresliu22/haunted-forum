const sequelize = require('../config/connection');
const seedUser = require('./userSeed');
const seedLocation = require('./locationSeed');
const seedPost = require('./postSeed');
const { seedComment, seedReply } = require('./commentSeed');

const seedDb = async () => {
  await sequelize.sync({ force: true });
  await seedUser();
  await seedLocation();
  await seedPost();
  await seedComment();
  await seedReply();
  process.exit(0);
};

seedDb();
