import '@config/env';
import connection from '@src/database/connection';
import CreateUserService from './CreateUserService';

beforeAll(async () => {
  await connection.sync({ force: true });
});

describe('UserController', () => {
  it('should be able to create a new user', async () => {
    const user = await CreateUserService({
      name: 'Kevyn Test',
      email: 'Kevyn email',
      password: 'Kevyn password',
    });

    await expect(user).toBeTruthy();
  });
});
