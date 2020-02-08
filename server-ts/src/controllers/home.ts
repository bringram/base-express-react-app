import { Request, Response, Router } from 'express';

const homeController = Router();

homeController.get('/', (req: Request, res: Response) => {
  res.send('Hello world!');
});

export default homeController;
