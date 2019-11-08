const express = require('express');
const AccountsRouter = require('./routes/accounts-router.js');

const server = express();

server.use(express.json());
server.use('/api/accounts', AccountsRouter);

server.get('/api/', (req, res) => {
  res.send(`You know the drill: get to work.`);
});

module.exports = server;