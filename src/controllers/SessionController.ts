import { Request, Response } from 'express';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../config/auth';

const store = async (req: Request, res: Response): Promise<Response> => {
  const { password } = req.body;

  try {
    const user = await User.findOne();

    if (!user) {
      throw new Error('Email/senha inválidos');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Email/senha inválidos');
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
    return res.status(400).send(error.message);
  }
};

export default {
  store,
};
