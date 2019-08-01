import express, { Request, Response } from 'express';

import { initializeLogger, accessLogger } from './startup/logging';
const logger = initializeLogger(module);

const app = express();
app.use(accessLogger);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!');
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
  logger.info(`Application started: listening on port ${port}`)
);
