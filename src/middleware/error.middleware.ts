import { Response, Request, NextFunction } from 'express';
import HttpException from '../exceptions/HttpException';

function errorHandler(
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = err.status || 500;
  const msg = err.message || 'Error, Please try again';
  res.status(status).send({ msg, status });
}

export default errorHandler;
