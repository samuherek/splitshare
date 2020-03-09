import { ApolloServer } from 'apollo-server';
import { createTestClient } from 'apollo-server-testing';
import { getSchema } from '../schema';

export default async function createTestServer(ctx: any) {
  const schema = await getSchema();

  const server = new ApolloServer({
    schema,
    mockEntireSchema: false,
    mocks: true,
    context: () => ctx,
  });

  return createTestClient(server);
}
