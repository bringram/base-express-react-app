import homeController from '../controllers/home';

/**
 * Initializes all the routes for the given Express application.
 *
 * @param {express.Application} app The Express application object
 */
export const initializeRoutes = app => {
  app.use('/', homeController);

  app.all('*', (req, res, next) => {
    res.status(404).json({ message: 'The requested resource was not found' });
  });
};
