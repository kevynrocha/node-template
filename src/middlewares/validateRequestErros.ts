import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

interface ErrorAttributes {
  [err: string]: string;
}

// eslint-disable-next-line import/prefer-default-export
export const validate = (
  req: Request,
  res: Response,
  next: NextFunction,
): void | Response<never> => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors: ErrorAttributes[] = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};
