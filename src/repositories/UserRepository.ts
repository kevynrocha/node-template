import User, { UserAttributes } from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

const create = async ({
  name,
  email,
  password,
}: Request): Promise<UserAttributes> => {
  const user = await User.create({ name, email, password });
  return user;
};

const findAll = async (): Promise<UserAttributes[]> => {
  const users = await User.findAll();
  return users;
};

export default {
  findAll,
  create,
};
