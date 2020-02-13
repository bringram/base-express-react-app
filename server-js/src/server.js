import express from 'express';
import stoppable from 'stoppable';

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

const stoppableServer = stoppable(server);

const shutdownServer = stoppableServer => {
  stoppableServer.stop();
  logger.info('Shutdown process complete');
};

process.on('SIGINT', () => {
  logger.info('Received SIGINT signal, beginning shutdown process');
  shutdownServer(stoppableServer);
});

process.on('SIGTERM', () => {
  logger.info('Received SIGTERM signal, beginning shutdown process');
  shutdownServer(stoppableServer);
});

export default stoppableServer;
