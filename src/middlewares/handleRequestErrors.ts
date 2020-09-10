import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import logger from 'src/logger';

const validate = (
  req: Request,
  res: Response,
  next: NextFunction,
): void | Response<never> => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors: string[] = [];

  errors
    .array()
    .map(error => extractedErrors.push(`${error.param}: ${error.msg}`));

  logger.error(String(extractedErrors));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

export default validate;
