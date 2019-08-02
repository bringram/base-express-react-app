import express from 'express';

import { initializeLogger } from './middleware/logging';
import { initializeMiddleware } from './startup/middleware';
import { initializeRoutes } from './startup/routes';

const logger = initializeLogger(module);
const app = express();

initializeMiddleware(app);
initializeRoutes(app);

const port = process.env.PORT || 3000;
let server = app.listen(port, () =>
  logger.info(`Application started: listening on port ${port}`)
);

export default server;
