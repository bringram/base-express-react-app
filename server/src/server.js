const express = require('express');

const app = express();

const { initializeLogger, accessLogger } = require('./startup/logging');
const logger = initializeLogger(module);
app.use(accessLogger);

app.get('/', (req, res) => {
  res.send('Hello world!');
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
  logger.info(`Application started: listening on port ${port}`)
);
