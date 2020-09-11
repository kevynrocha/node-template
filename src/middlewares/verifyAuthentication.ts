import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@src/errors/AppError';
import logger from '@src/logger';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

const verifyAuthentication = (
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw AppError('JWT não foi enviado', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
      const decoded = verify(token, authConfig.jwt.secret);

      const { sub } = decoded as ITokenPayload;

      req.user = {
        id: sub,
      };
    } catch (error) {
      logger.error(error);
      throw AppError('JWT com assinatura inválida', 401);
    }

    return next();
  } catch (error) {
    logger.error(error);
    return res.status(error.statusCode).send(error.message);
  }
};

export default verifyAuthentication;
