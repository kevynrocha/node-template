import UserRepository from '@repositories/User/UserRepository';
import { IUserAttributes } from '@models/User';
import AppError from '@src/errors/AppError';
import { hash } from 'bcryptjs';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

const CreateUserService = async ({
  name,
  email,
  password,
}: IRequest): Promise<IUserAttributes | undefined> => {
  const checkUserExists = await UserRepository.findOneByEmail(email);

  if (checkUserExists) {
    throw AppError('Email já existe', 401);
  }

  const hashedPassword = await hash(password, 8);

  const user = await UserRepository.create({
    name,
    email,
    password: hashedPassword,
  });

  return user;
};

export default CreateUserService;
