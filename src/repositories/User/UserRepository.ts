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
}: IRequest): Promise<IUserAttributes | undefined> => {
  const user = await User.create({ name, email, password }, { logging: false });
  return user;
};

const findAll = async (): Promise<IUserAttributes[]> => {
  const users = await User.findAll({
    logging: false,
  });
  return users;
};

const findOneById = async (id: number): Promise<IUserAttributes | null> => {
  const user = await User.findOne({
    where: {
      id,
    },
    logging: false,
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
    logging: false,
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
    { where: { id }, logging: false },
  );
  return user;
};

const destroy = async (id: string): Promise<number> => {
  const user = await User.destroy({
    where: {
      id,
    },
    logging: false,
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
