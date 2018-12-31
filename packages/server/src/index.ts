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
import { redisSessionPrefix } from './constants';

const RedisStore = connectRedis(session);

const startServer = async () => {
  await createTypeormConn();

  const app = express();

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
    context: ({ req }: any) => ({
      req,
      redis,
      session: req ? req.session : undefined,
    }),
  });

  // app.use((req, _, next) => {
  //   const authorization = req.headers.authorization;
  //   console.log('authorize', req.headers.authorization);
  //   if (authorization) {
  //     try {
  //       const qid = authorization.split(' ')[1];
  //       req.headers.cookie = `qid=${qid}`;
  //     } catch (_) {}
  //   }

  //   return next();
  // });

  app.use(
    session({
      store: new RedisStore({
        client: redis as any,
        prefix: redisSessionPrefix,
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

  app.use(
    cors({
      credentials: true,
      origin: process.env.FRONTEND_URL,
    })
  );

  // Comment: This is necessary to overwrite the cors otherwise it gives it "*" and then it doesn't work. https://github.com/expressjs/cors/issues/134
  server.applyMiddleware({
    app,
    path: '/',
    cors: false,
  });

  app.set('trust proxy', 1);

  server.applyMiddleware({ app }); // app is from an existing express app

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
