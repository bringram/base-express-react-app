import { Application } from 'express';

import homeController from '../controllers/home';

/**
 * Initializes all the routes for the given Express application.
 *
 * @param app {Application} The Express application object
 */
export const initializeRoutes = (app: Application) => {
  app.use('/', homeController);
};
