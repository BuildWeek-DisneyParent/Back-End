const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const restricted = require('../auth/Restricted-middleware');
const authRouter = require('../auth/authRouter.js');
const parentRouter = require('../parent/parentRouter');
const requestRouter = require('../request/requestRouter')

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use('/api', requestRouter)
server.use('/api/auth', authRouter);
server.use('/api', restricted, parentRouter);

server.get('/', (req, res) => {
  res.send("It's alive!");
});

module.exports = server;
