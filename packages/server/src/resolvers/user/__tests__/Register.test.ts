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

const REGISTER_MUTATION = `
  mutation register($email: String!, $password: String!) {
    register(email: $email, password: $password)
  }
`;

describe.skip('Register', () => {
  it('successfully create a user', async () => {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const response = await gCall({
      source: REGISTER_MUTATION,
      variableValues: user,
    });

    expect(response).toMatchObject({
      data: {
        register: true,
      },
    });

    const dbUser = await User.findOne({ where: { email: user.email } });
    expect(dbUser).toBeDefined();
    expect(dbUser!.confirmed).toBeFalsy();
    expect(dbUser!.email).toBe(user.email);
  });
});
