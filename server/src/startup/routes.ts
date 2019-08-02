import { Application, Request, Response, NextFunction } from 'express';

import homeController from '../controllers/home';

/**
 * Initializes all the routes for the given Express application.
 *
 * @param app {Application} The Express application object
 */
export const initializeRoutes = (app: Application) => {
  app.use('/', homeController);

  app.all('*', (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: 'The requested resource was not found' });
  });
};
