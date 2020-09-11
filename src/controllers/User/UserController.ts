import { Request, Response } from 'express';
import UserRepository from '@repositories/UserRepository';
import AppError from '@src/errors/AppError';
import logger from '@src/logger';
import CreateUserService from '@services/User/CreateUserService';

const store = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, email, password } = req.body;
    const user = await CreateUserService({ name, email, password });
    return res.status(201).json(user);
  } catch (error) {
    logger.error(error);
    return res.status(error.statusCode).json({
      error: error.message,
    });
  }
};

const index = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users = await UserRepository.findAll();

    const usersWithoutPassword = users.map(user => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at,
      };
    });

    return res.status(200).json(usersWithoutPassword);
  } catch (error) {
    logger.error(error);
    return res.status(error.statusCode).json({
      error: error.message,
    });
  }
};

const show = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const user = await UserRepository.findOneById(Number(id));

    if (!user) {
      throw AppError('Nenhum usuário encontrado');
    }

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return res.status(200).json(userWithoutPassword);
  } catch (error) {
    logger.error(error);
    return res.status(error.statusCode).json({
      error: error.message,
    });
  }
};

const update = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const user = await UserRepository.update({
      id,
      name,
      email,
      password,
    });

    const [updatedUser] = user;

    if (!updatedUser) {
      throw AppError('Não existe usuário com esse id');
    }

    return res.status(201).json(user);
  } catch (error) {
    logger.error(error);
    return res.status(error.statusCode).json({
      error: error.message,
    });
  }
};

const destroy = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const user = await UserRepository.destroy(id);

    if (!user) {
      throw AppError('Não existe usuário com esse id');
    }

    return res.status(201).json(user);
  } catch (error) {
    logger.error(error);
    return res.status(error.statusCode).json({
      error: error.message,
    });
  }
};

export default { store, index, show, update, destroy };
