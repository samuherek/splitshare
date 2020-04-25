import { makeExecutableSchema } from 'apollo-server-express';
import * as glob from 'glob';
import { GraphQLDate, GraphQLDateTime } from 'graphql-iso-date';
import gql from 'graphql-tag';
// @ts-ignore
import * as merge from 'lodash.merge';
import * as util from 'util';

const globPromise = util.promisify(glob);

// If you had Query fields not associated with a
// specific type you could put them here
const Query = gql`
  scalar Date
  scalar DateTime
  scalar Upload

  type PageInfo {
    hasNextPage: Boolean!
    endCursor: String!
    itemsCount: Int!
  }

  input PaginationInput {
    offset: Int
    limit: Int
    after: String
  }

  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

const baseResolver = {
  Date: GraphQLDate,
  DateTime: GraphQLDateTime,
};

async function getTypes() {
  const res = await globPromise(__dirname + '/features/**/types{.ts,.js}');
  return res.map((file) => require(file).default);
}

async function getQueries() {
  const res = await globPromise(__dirname + '/features/**/queries{.ts,.js}');
  return res.map((file) => require(file).default);
}

async function getMutations() {
  const res = await globPromise(__dirname + '/features/**/mutations{.ts,.js}');
  return res.map((file) => require(file).default);
}

export async function getSchema() {
  const types = await getTypes();
  const queries = await getQueries();
  const mutations = await getMutations();

  return makeExecutableSchema({
    typeDefs: [Query, ...types],
    resolvers: merge(baseResolver, ...queries, ...mutations),
  });
}
