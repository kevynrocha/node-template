import { Request, Response } from 'express';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import UserRepository from '@repositories/User/UserRepository';
import authConfig from '@config/auth';
import AppError from '@src/errors/AppError';
import logger from '@src/logger';

const store = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  try {
    const user = await UserRepository.findOneByEmail(email);

    if (!user) {
      throw AppError('Email/senha inválidos');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw AppError('Email/senha inválidos');
    }

    const { expiresIn, secret } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    return res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    logger.error(error);
    return res.status(error.statusCode).send(error.message);
  }
};

export default {
  store,
};
