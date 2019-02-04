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

const ME_QUERY = `
  query me {
    me {
      id
      email
      displayName
      photoUrl
    }
  }
`;

describe('Me', () => {
  it('Query me', async () => {
    const user = await User.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
    }).save();

    const response = await gCall({
      source: ME_QUERY,
      userId: user.id,
    });

    expect(response).toMatchObject({
      data: {
        me: {
          displayName: null,
          email: user.email,
          id: user.id,
          photoUrl: null,
        },
      },
    });
  });

  it('returns null', async () => {
    const response = await gCall({
      source: ME_QUERY,
    });

    expect(response).toMatchObject({
      data: {
        me: null,
      },
    });
  });
});
