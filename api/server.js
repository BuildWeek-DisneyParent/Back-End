const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
//const authentic = require('../auth/Restricted-middleware')
const authRouter = require('../auth/authRouter.js');
const parentRouter = require('../parent/parentRouter');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api', parentRouter);

server.get('/', (req, res) => {
  res.send("It's alive!");
});

module.exports = server;
