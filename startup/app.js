const express = require('express');
const cors = require('cors');

exports.getAppInstance = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(`/test`, (req, res) => {
    return res.send({ message: `Endpoint Ok! :)` });
  })
  return app;
}
