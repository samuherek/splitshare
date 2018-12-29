import 'reflect-metadata';
require('dotenv-safe').config();
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import * as connectRedis from 'connect-redis';
import * as cors from 'cors';
import * as express from 'express';
import * as session from 'express-session';

import { createTypeormConn } from './createTypeormConn';
import { redis } from './redis';
import { UserResolver } from './resolvers/user';

const RedisStore = connectRedis(session);

const startServer = async () => {
  await createTypeormConn();

  const app = express();

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
  });

  app.use(
    cors({
      credentials: true,
      origin: process.env.FRONTEND_URL,
    })
  );

  app.use(
    session({
      store: new RedisStore({
        client: redis as any,
      }),
      name: 'qid',
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
      },
    } as any)
  );

  server.applyMiddleware({ app }); // app is from an existing express app

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
