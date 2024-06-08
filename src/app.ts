import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// applications routes
app.use('/api/v1', router);

const test = async (req: Request, res: Response) => {
  Promise.reject();
};

app.get('/', test);

// global error handling
app.use(globalErrorHandler);

// not found route

app.use(notFound);

export default app;
