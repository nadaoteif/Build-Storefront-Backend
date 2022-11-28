import { UsersModel } from '../models/user.model';
import { Request, Response, Router, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import auth_Middleware from '../middlewares/auth'
import config from '../config';


const userRoutes = Router();
const usersModel = new UsersModel();

//controllers 
userRoutes.post('/', auth_Middleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await usersModel.create(req.body);
    const token = jwt.sign({ user }, config.tokenSecret as unknown as string);
    res.json({
      data: { ...user, token }
    });
  } catch (err) {
    next(err);
  }
}
);

userRoutes.get('/', auth_Middleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await usersModel.index();
    res.json({
      data: { users }
    });
  } catch (err) {
    next(err);
  }
}
);


userRoutes.get('/:id', auth_Middleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await usersModel.show(req.params.id as unknown as number);
    res.json({
      data: { user }
    });
  } catch (err) {
    next(err);
  }
}
);


userRoutes.patch('/:id', auth_Middleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await usersModel.update(req.body);
      res.json({
        data: { user }
      });
    } catch (err) {
      next(err);
    }
  }
);

userRoutes.delete('/:id',auth_Middleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await usersModel.delete(req.params.id as unknown as number);
      res.json({
        data: { user }
      });
    } catch (err) {
      next(err);
    }
  }
);

userRoutes.post('/authenticate', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userName, password } = req.body;

    const user = await usersModel.authenticate(userName, password);
    const token = jwt.sign({ user }, config.tokenSecret as unknown as string);
    if (!user) {
      return res.json({
        message: 'username && password not matched'
      });
    }
    return res.json({
      data: { ...user, token },
    });
  } catch (err) {
    return next(err);
  }
});



export default userRoutes;
