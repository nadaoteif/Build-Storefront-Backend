import express from 'express';
import { Application, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import routes from './routes';
import errorHandler from './middlewares/err';
import config from './config';

dotenv.config();

const PORT = config.port || 3000;
const app: Application = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());

app.use('/endpointes', routes);
app.use(errorHandler);

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'welcome to My Store',
  });
});

app.post('/', (req: Request, res: Response) => {
  res.json({
    message: 'welcome to My Store -from post- ',
    data: req.body,
  });
});

app.listen(PORT, () => {
  console.log(`Server is starting at port:${PORT}`,`http://localhost:3000`);
});

export default app;
