import { Request, Response } from 'express';
import { hash } from 'bcryptjs';
import User from '../models/User';
import UserRepository from '../repositories/UserRepository';

const store = async (req: Request, res: Response): Promise<Response> => {
  const { name, email, password } = req.body;

  try {
    const checkUserExists = await User.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new Error('Email já existe');
    }

    const hashedPassword = await hash(password, 8);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const index = async (req: Request, res: Response): Promise<Response> => {
  const users = await UserRepository.findAll();
  return res.json(users);
};

export default {
  store,
  index,
};
