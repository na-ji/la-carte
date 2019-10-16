import 'reflect-metadata';
import next from 'next';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';

import { buildSchema, connectDatabase } from './schema';

const isDev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev: isDev });
const handle = nextApp.getRequestHandler();
const port = parseInt(process.env.PORT) || 3000;

async function bootstrap() {
  try {
    console.info('Starting next app');
    await nextApp.prepare();

    console.info('Connecting to database');
    await connectDatabase();

    const server = express();

    console.info('Building GQL schema');
    const schema = await buildSchema();

    console.info('Starting GQL server');
    const apolloServer = new ApolloServer({ schema, tracing: isDev });
    apolloServer.applyMiddleware({ app: server });

    server.all('*', (req, res) => {
      return handle(req, res);
    });

    console.info('Starting server');
    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  } catch (err) {
    console.error(err);
  }
}

bootstrap();
