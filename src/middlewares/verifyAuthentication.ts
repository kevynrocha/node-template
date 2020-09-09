import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface TokenPayload {
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
      throw new Error('JWT não foi enviado');
    }

    const [, token] = authHeader.split(' ');

    try {
      const decoded = verify(token, authConfig.jwt.secret);

      const { sub } = decoded as TokenPayload;

      req.user = {
        id: sub,
      };
    } catch {
      throw new Error('JWT com assinatura inválida');
    }

    return next();
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

export default verifyAuthentication;
