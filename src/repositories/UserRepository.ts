import User, { IUserAttributes } from '@models/User';

interface IRequest {
  id?: string;
  name: string;
  email: string;
  password: string;
}

const create = async ({
  name,
  email,
  password,
}: IRequest): Promise<IUserAttributes> => {
  const user = await User.create({ name, email, password });
  return user;
};

const findAll = async (): Promise<IUserAttributes[]> => {
  const users = await User.findAll();
  return users;
};

const findOneById = async (id: string): Promise<IUserAttributes | null> => {
  const user = await User.findOne({
    where: {
      id,
    },
  });
  return user;
};

const findOneByEmail = async (
  email: string,
): Promise<IUserAttributes | null> => {
  const user = await User.findOne({
    where: {
      email,
    },
  });
  return user;
};

const update = async ({
  id,
  name,
  email,
  password,
}: IRequest): Promise<Array<number | IUserAttributes[]>> => {
  const user = await User.update(
    { name, email, password },
    { where: { id }, transaction: t },
  );
  return user;
};

const destroy = async (id: string): Promise<number> => {
  const user = await User.destroy({
    where: {
      id,
    },
  });
  return user;
};

export default {
  findAll,
  create,
  findOneById,
  findOneByEmail,
  update,
  destroy,
};
