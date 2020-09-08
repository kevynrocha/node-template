import User, { UserAttributes } from '../models/User';
import connection from '../database/connection';

interface Request {
  id?: string;
  name: string;
  email: string;
  password: string;
}

const create = async ({
  name,
  email,
  password,
}: Request): Promise<UserAttributes> => {
  const t = await connection.transaction();

  try {
    const user = await User.create(
      { name, email, password },
      { transaction: t },
    );

    await t.commit();
    return user;
  } catch (error) {
    await t.rollback();
    return error.message;
  }
};

const findAll = async (): Promise<UserAttributes[]> => {
  const users = await User.findAll();
  return users;
};

const findOneById = async (id: string): Promise<UserAttributes | null> => {
  const user = await User.findOne({
    where: {
      id,
    },
  });
  return user;
};

const findOneByEmail = async (
  email: string,
): Promise<UserAttributes | null> => {
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
}: Request): Promise<Array<number | UserAttributes[]>> => {
  const t = await connection.transaction();

  try {
    const user = await User.update(
      { name, email, password },
      { where: { id }, transaction: t },
    );
    await t.commit();
    return user;
  } catch (error) {
    await t.rollback();
    return error.message;
  }
};

const destroy = async (id: string): Promise<number> => {
  const t = await connection.transaction();

  try {
    const user = await User.destroy({
      where: {
        id,
      },
      transaction: t,
    });
    await t.commit();
    return user;
  } catch (error) {
    await t.rollback();
    return error.message;
  }
};

export default {
  findAll,
  create,
  findOneById,
  findOneByEmail,
  update,
  destroy,
};
