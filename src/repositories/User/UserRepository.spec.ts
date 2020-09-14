import '@config/env';
import connection from '@src/database/connection';
import User from '@src/models/User';
import UserRepository from './UserRepository';

beforeEach(async () => {
  await User.destroy({ truncate: true, logging: false });
});

afterAll(async () => {
  await User.destroy({ truncate: true, logging: false });
  await connection.close();
});

describe('User Repository', () => {
  it('should be able to create a new user', async () => {
    const user = await UserRepository.create({
      name: 'Name Repository',
      email: 'email_repository@email.com',
      password: 'repository',
    });
    expect(user?.name).toEqual('Name Repository');
    expect(user?.email).toEqual('email_repository@email.com');
    expect(user?.password).toEqual('repository');
    expect(user?.id).toHaveLength(36);
    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same e-mail', async () => {
    await UserRepository.create({
      name: 'Name Repository',
      email: 'email_repository@email.com',
      password: 'repository',
    });

    expect(
      UserRepository.create({
        name: 'Name Repository',
        email: 'email_repository@email.com',
        password: 'repository',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
