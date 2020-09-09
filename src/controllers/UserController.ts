import { Request, Response } from 'express';
import { hash } from 'bcryptjs';
import UserRepository from '@repositories/UserRepository';

const store = async (req: Request, res: Response): Promise<Response> => {
  const { name, email, password } = req.body;

  try {
    const checkUserExists = await UserRepository.findOneByEmail(email);

    if (checkUserExists) {
      throw new Error('Email já existe');
    }

    const hashedPassword = await hash(password, 8);

    const user = await UserRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).send(error.message);
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
    return res.status(400).send(error.message);
  }
};

const show = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  try {
    const user = await UserRepository.findOneById(id);

    if (!user) {
      throw new Error('Nenhum usuário encontrado');
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
    return res.status(400).send(error.message);
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
      throw new Error('Não existe usuário com esse id');
    }

    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const destroy = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const user = await UserRepository.destroy(id);

    if (!user) {
      throw new Error('Não existe usuário com esse id');
    }

    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

export default { store, index, show, update, destroy };
