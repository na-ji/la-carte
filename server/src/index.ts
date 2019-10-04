const { GraphQLServer } = require('graphql-yoga')
const Query = require('./resolvers/Query')

import { Photon } from '@generated/photon'
const photon = new Photon();

const resolvers = {
    Query,
};

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: {
        photon,
    }
});
server.start({
    logFunction() {
        console.log(arguments);
    }
}, () => console.log(`Server is running on http://localhost:4000`))
