import { Response, Request, NextFunction } from 'express';

interface Error {
  status?: number;
  name?: string;
  message?: string;
  stack?: string;
}

const errorHandler = (error: Error, _req: Request, res: Response, _next: NextFunction) => {
  const status = error.status || 500;
  const message = error.message || 'something went wrong';
  res.status(status).json({
    status,
    message
  })
};

export default errorHandler;
