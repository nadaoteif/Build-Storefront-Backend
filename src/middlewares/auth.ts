import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

interface Error {
  status?: number;
  name?: string;
  message?: string;
  stack?: string;
}

const verfiyToken = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const authHeader : string | undefined = req.headers.authorization
    const token : string = authHeader ? authHeader.split(' ')[1] : ''
    const userToken = jwt.verify(token, config.tokenSecret as unknown as string)

    if (userToken) {
     next()
    } else {
        const error: Error = new Error('login error, please try again')
        error.status = 401
        next(error)
    }
  } catch (err) {
    const error: Error = new Error('login error, please try again')
    error.status = 401
    next(error)
  }
};

export default verfiyToken;
