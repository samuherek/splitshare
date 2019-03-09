import { ApolloServer } from 'apollo-server-express';
import * as connectRedis from 'connect-redis';
import * as cors from 'cors';
import * as express from 'express';
import * as session from 'express-session';
import { GraphQLError, GraphQLSchema } from 'graphql';
import 'reflect-metadata';
import { redisSessionPrefix } from './constants';
import { createSchema } from './createSchema';
// import { v4 } from 'uuid';
import { createTypeormConn } from './createTypeormConn';
import { billInvitesLoader } from './loaders/billInvitesLoader';
import { billLoader } from './loaders/billLoader';
import { billUsersLoader } from './loaders/billUsersLoader';
import { receiptLoader } from './loaders/receiptLoader';
import { receiptSplitsLoader } from './loaders/receiptSplitsLoader';
import { userLoader } from './loaders/userLoader';
import { redis } from './redis';
import { confirmEmail } from './routes/confirmEmail';
require('dotenv-safe').config({
  allowEmptyValues: true,
});

const RedisStore = connectRedis(session);

// Show unhandled rejections
process.on('unhandledRejection', function(reason, promise) {
  console.log(reason, promise);
});

const startServer = async () => {
  await createTypeormConn();

  const app = express();

  const server = new ApolloServer({
    schema: (await createSchema()) as GraphQLSchema | undefined,
    context: ({ req, res }: any) => ({
      req,
      res,
      redis,
      userLoader: userLoader(),
      billLoader: billLoader(),
      billUsersLoader: billUsersLoader(),
      billInvitesLoader: billInvitesLoader(),
      receiptLoader: receiptLoader(),
      receiptSplitsLoader: receiptSplitsLoader(),
      url: req.protocol + '://' + req.get('host'),
    }),
    formatError: (error: GraphQLError) => {
      return error;
      // if (error.originalError instanceof ApolloError) {
      //   return error;
      // }

      // const errId = v4();
      // console.log('errId: ', errId);
      // console.log(error);

      // return new GraphQLError(`Internal Error: ${errId}`);
    },
  });

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

  app.get('/confirm/:id', confirmEmail);

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
