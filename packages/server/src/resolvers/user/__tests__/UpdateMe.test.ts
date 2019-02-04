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

const UPDATE_ME_MUTATION = `
  mutation updateMe($meInput: MeInput!) {
    updateMe(meInput: $meInput) {
      displayName
      email
      id
    }
  }
`;

describe('Update Me', () => {
  it('should update an existing user', async () => {
    const user = await User.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
    }).save();

    const newFields = {
      displayName: faker.name.firstName(),
      email: faker.internet.email(),
    };

    const response = await gCall({
      source: UPDATE_ME_MUTATION,
      userId: user.id,
      variableValues: {
        meInput: newFields,
      },
    });

    expect(response).toMatchObject({
      data: {
        updateMe: {
          displayName: newFields.displayName,
          email: newFields.email,
          id: user.id,
        },
      },
    });
  });

  it('should not allowed to update if not logged in', async () => {
    const newFields = {
      displayName: faker.name.firstName(),
      email: faker.internet.email(),
    };

    const response = await gCall({
      source: UPDATE_ME_MUTATION,
      variableValues: {
        meInput: newFields,
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
