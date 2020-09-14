import '@config/env';
import connection from '@src/database/connection';
import AppError from '@src/errors/AppError';
import User from '@src/models/User';
import CreateUserService from './CreateUserService';

beforeEach(async () => {
  await User.destroy({ truncate: true });
});

afterAll(async () => {
  await User.destroy({ truncate: true });
  await connection.close();
});

describe('User Service', () => {
  it('should be able to create a new user', async () => {
    const user = await CreateUserService({
      name: 'Name Service',
      email: 'email_service@email.com',
      password: 'Service',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same e-mail', async () => {
    await CreateUserService({
      name: 'Name Service',
      email: 'email_service@email.com',
      password: 'Service',
    });

    expect(
      CreateUserService({
        name: 'Name Service',
        email: 'email_service@email.com',
        password: 'Service',
      }),
    ).rejects.toEqual(AppError('Email já existe', 401));
  });
});
