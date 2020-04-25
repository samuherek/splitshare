import { ApolloServer } from 'apollo-server-express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as jwt from 'express-jwt';
import { GraphQLError } from 'graphql';
import * as jwks from 'jwks-rsa';
import * as morgan from 'morgan';
import * as path from 'path';
import 'reflect-metadata';
import { getRepository } from 'typeorm';
import * as db from './db';
import { User } from './entity/User';
import { UserState } from './features/user/config';
import { getSchema } from './schema';

// We can not use ".env" because it collides with the way typeorm works
// Also, because of this, have to have dedicated ".env" files per environment like this
// ".env.development" or ".env.production"
// Otherwise working with typeorm cli.js is impossible since we have
// CustomNamingStrategy
// https://github.com/typeorm/typeorm/issues/3420
require('dotenv').config({
  path: path.resolve(__dirname, '..', `.env.${process.env.NODE_ENV}`),
});

const emailKey = 'https://splitshare.me/email';
const verifyKey = 'https://splitshare.me/email_verified';

async function context({ req, res }: any) {
  // const { user } =
  //   process.env.NODE_ENV === 'production'
  //     ? req
  //     : { user: { [emailKey]: 'samuherekbiz@gmail.com' } };

  let { user } = req;

  if (process.env.ACTIVATE_AUTH === 'false') {
    user = {
      [emailKey]: process.env.TEST_USER,
      [verifyKey]: true,
    };
  }

  const userEmail = user ? user[emailKey] : null;

  let dbUser = null;

  if (userEmail) {
    dbUser = await User.findOne({ where: { email: userEmail } });

    if (!dbUser) {
      dbUser = await User.create({
        email: userEmail,
      }).save();
    }

    if (user[verifyKey] && dbUser.state === UserState.ONBOARDING_VERIFY_EMAIL) {
      dbUser = await getRepository(User).update(dbUser.id, {
        state: UserState.ONBOARDING_PROFILE,
      });
    }
  }

  return {
    req,
    res,
    user: dbUser,
    models: db.models,
    // url: req.protocol + '://' + req.get('host'),
  };
}

function formatError(error: GraphQLError) {
  console.log(error);
  // if (error.originalError instanceof ApolloError) {
  //   return error;
  // }

  // const errId = v4();
  // console.log('errId: ', errId);
  // console.log(error);

  // return new GraphQLError(`Internal Error: ${errId}`);
  return error;
}

async function startServer(): Promise<any> {
  await db.init();

  const app = express();

  app.use(
    morgan(
      '[:date[clf]] :method :url :status :res[content-length] - :response-time ms'
    )
  );

  app.get('/', (_: any, res) => {
    res.json({
      name: 'splitshare.grapqhl',
      version: '0.0.1',
      graphql: 'graphql',
    });
  });

  const schema = await getSchema();

  const server = new ApolloServer({
    schema,
    context: context,
    formatError: formatError,
  });

  if (process.env.ACTIVATE_AUTH === 'true') {
    const jwtCheck = jwt({
      secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.AUTH0_AUTH_URL || ''}.well-known/jwks.json`,
      }),
      credentialsRequired: true,
      audience: process.env.AUTH0_AUDIENCE || '',
      issuer: process.env.AUTH0_AUTH_URL || '',
      algorithms: ['RS256'],
    });

    app.use(jwtCheck);
  }

  // Increased the size for the "Import BILL" feature which is
  // a big stringified JSON
  app.use(bodyParser.json({ limit: '1mb' }));

  app.use(
    cors({
      credentials: true,
      origin: process.env.FRONTEND_URL || '',
    })
  );

  // Comment: This is necessary to overwrite the cors otherwise it gives it "*" and then it doesn't work. https://github.com/expressjs/cors/issues/134
  server.applyMiddleware({
    app,
    path: '/graphql',
    cors: false,
  });

  app.set('trust proxy', 1);

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

// Show unhandled rejections
process.on('unhandledRejection', function (reason, promise) {
  console.log(reason, promise);
});

startServer();
