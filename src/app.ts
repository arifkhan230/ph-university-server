import express, { Application, Request, Response } from 'express'
import config from './app/config'
const app: Application = express();
const port = config.port || 5000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app;