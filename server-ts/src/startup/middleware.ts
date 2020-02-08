import { Application } from 'express';
import bodyParser from 'body-parser';
import { accessLogger } from '../middleware/logging';

/**
 * Initializes all the middleware required for the given Express application.
 *
 * @param app {Application} The Express application object
 */
export const initializeMiddleware = (app: Application) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(accessLogger);
};
