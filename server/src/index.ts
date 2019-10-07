import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { Container } from 'typedi';
import * as TypeORM from 'typeorm';
import * as TypeGraphQL from 'type-graphql';

import { PokemonResolver } from './resolvers/pokemon-resolver';
import { Pokemon } from './entities/pokemon';

// register 3rd party IOC container
TypeORM.useContainer(Container);

async function bootstrap() {
  try {
    // create TypeORM connection
    await TypeORM.createConnection({
      type: 'mysql',
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      port: 3306,
      host: process.env.DB_HOST,
      entities: [Pokemon],
      logger: 'advanced-console',
      logging: 'all',
      maxQueryExecutionTime: 10,
      cache: true
    });

    // build TypeGraphQL executable schema
    const schema = await TypeGraphQL.buildSchema({
      resolvers: [PokemonResolver],
      container: Container
    });

    // Create GraphQL server
    const server = new ApolloServer({ schema });

    // Start the server
    const { url } = await server.listen(4000);
    console.log(`Server is running, GraphQL Playground available at ${url}`);
  } catch (err) {
    console.error(err);
  }
}

bootstrap();
