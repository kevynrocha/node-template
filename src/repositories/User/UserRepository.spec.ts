import '@config/env';
import connection from '@src/database/connection';
import UserRepository from './UserRepository';

beforeEach(async () => {
  await connection.sync({ force: true, logging: false });
});

afterAll(async () => {
  await connection.close();
});

describe('User Repository', () => {
  it('should be able to create a new user', async () => {
    const user = await UserRepository.create({
      name: 'name',
      email: 'email@email.com',
      password: '123456',
    });

    expect(user?.name).toEqual('name');
    expect(user?.email).toEqual('email@email.com');
    expect(user?.password).toEqual('123456');
    expect(user?.id).toHaveLength(36);
    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same e-mail', async () => {
    await UserRepository.create({
      name: 'name',
      email: 'email@email.com',
      password: '123456',
    });

    expect(
      UserRepository.create({
        name: 'name',
        email: 'email@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
