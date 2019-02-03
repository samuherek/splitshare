import { buildSchema } from 'type-graphql';

export const createSchema = () =>
  buildSchema({
    resolvers: [__dirname + '/resolvers/*/*.ts'],
    authChecker: ({ context }) => {
      return context.req.session && context.req.session.userId; // or false if access denied
    },
  });
