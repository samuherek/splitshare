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

const LOGOUT_MUTATION = `
  mutation logout {
    logout
  }
`;

describe.skip('Logout', () => {
  // TODO: Figure out how to test this.
  it('should log out an existing user', async () => {
    const user = await User.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
    }).save();

    const response = await gCall({
      source: LOGOUT_MUTATION,
      userId: user.id,
    });

    expect(response).toMatchObject({
      data: {
        logout: true,
      },
    });
  });
});
