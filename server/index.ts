import 'reflect-metadata';
import next from 'next';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';

import { buildSchema, connectDatabase } from './schema';
import { GraphQLSchema } from 'graphql';

const isDev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev: isDev });
const nextHandler = nextApp.getRequestHandler();
const port = parseInt(process.env.PORT) || 3000;

function startNextApp(): Promise<void> {
  console.info('Starting next app');

  return nextApp.prepare();
}

function connectToDatabase(): Promise<void> {
  console.info('Connecting to database');

  return connectDatabase();
}

function buildGQLSchema(): Promise<GraphQLSchema> {
  console.info('Building GQL schema');

  return buildSchema();
}

async function bootstrap() {
  try {
    const server = express();

    const nextPromise = startNextApp();

    const [_, schema] = await Promise.all([
      connectToDatabase(),
      buildGQLSchema()
    ]);

    console.info('Starting GQL server');
    const apolloServer = new ApolloServer({ schema, tracing: isDev });
    apolloServer.applyMiddleware({ app: server });

    server.all('*', (req, res) => {
      return nextHandler(req, res);
    });

    console.info('Starting server');
    server.listen(port, err => {
      if (err) throw err;
      console.log(`> GQL server ready on http://localhost:${port}/graphql`);

      nextPromise.then(() => {
        console.log(`> Application ready on http://localhost:${port}/`);
      });
    });
  } catch (err) {
    console.error(err);
  }
}

bootstrap();
