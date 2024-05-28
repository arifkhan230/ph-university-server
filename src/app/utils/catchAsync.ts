import { NextFunction, Request, RequestHandler, Response } from 'express';

// using this function to avoid using try catch again and again
const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

export default catchAsync;
