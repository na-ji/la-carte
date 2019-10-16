import * as TypeGraphQL from 'type-graphql';
import { Container } from 'typedi';
import * as TypeORM from 'typeorm';

import resolvers from './resolvers';
import entities from './entities';

TypeORM.useContainer(Container);

export const buildSchema = async () => {
  return await TypeGraphQL.buildSchema({
    resolvers,
    container: Container,
    validate: false,
    emitSchemaFile: 'schema.graphql'
  });
};

export const connectDatabase = async () => {
  // create TypeORM connection
  await TypeORM.createConnection({
    type: 'mysql',
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: 3306,
    host: process.env.DB_HOST,
    entities,
    logger: 'advanced-console',
    logging: 'all',
    maxQueryExecutionTime: 10,
    cache: true
  });
};
