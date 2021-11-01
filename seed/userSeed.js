const { User } = require('../models/');
const date = new Date();

const userData = [
  // id 1
  {
    creation_date: date.toDateString(),
    email: 'jimmyjohn@gmail.com',
    username: 'jimmyJohn420',
    password: 'baconbits897',
  },
  // id 2
  {
    creation_date: date.toDateString(),
    email: 'mattsucks@hotmail.com',
    username: 'mattSucksAlot',
    password: 'biggieSmalls945',
  },
  // id 3
  {
    creation_date: date.toDateString(),
    email: 'hahahahahaha@gmail.com',
    username: 'javascriptIsEpic2',
    password: 'heehaww69aaa',
  },
];

// Since we are bulk creating, these passwords will not be hashed
const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
