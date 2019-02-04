import { Connection } from 'typeorm';
import * as faker from 'faker';

import { testConn } from '../../../test-utils/testConn';
import { gCall } from '../../../test-utils/gCall';
import { User } from '../../../entity/User';

let conn: Connection;

beforeAll(async () => {
  conn = await testConn();
});

afterAll(async () => {
  await conn.close();
});

const LOGIN_MUTATION = `
  mutation login($email: String!, $password: String!) {
    login(password: $password, email: $email)
  }
`;

describe('Login', () => {
  it('should log in with existing user', async () => {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    await User.create(user).save();

    const response = await gCall({
      source: LOGIN_MUTATION,
      variableValues: user,
    });

    expect(response).toMatchObject({
      data: {
        login: true,
      },
    });
  });

  it('should not login with wrong credentails', async () => {
    const user = {
      user: faker.name.firstName(),
      email: faker.internet.email(),
    };

    const response = await gCall({
      source: LOGIN_MUTATION,
      variableValues: {
        email: user.email,
        password: faker.internet.password(),
      },
    });

    expect(response).toMatchObject(
      expect.objectContaining({
        data: null,
        errors: expect.any(Array),
      })
    );
  });
});
