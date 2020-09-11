import { Request, Response, NextFunction } from 'express';
import logger from '@src/logger';

const handleResponseErrors = (
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
): Response => {
  logger.error(error.message);
  return res.status(500).json({
    name: error.name,
    message: error.message,
  });
};

export default handleResponseErrors;
