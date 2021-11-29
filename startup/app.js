exports.getAppInstance = () => {
  const express = require('express');
  const cors = require('cors');
  const dotEnv = require('dotenv');

  dotEnv.config();
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(`/test`, (req, res, next) => {
    return res.send({ message: `Endpoint Ok! :)` });
  })
  return app;
}