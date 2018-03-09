const express = require('express');
const server = express();
const PORT = 3030;
const controllers = require('./controllers/bitcoin.js')
const bodyParser = require('body-parser');
const cors = require('cors');

server.use(controllers);
server.use(bodyParser.json());
server.use(cors());

server.listen(PORT, (err) => {
  if (err) {
    console.log(`There was an error starting the server: ${err}`);
  }
  else {
    console.log(`Server is listening on port ${PORT}`);
  }
});