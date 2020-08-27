import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import bodyParser from 'body-parser';

import connectToMongo from './src/helpers/connectToMongo';
import typeDefs from './src/graphql/typedefs';
import resolvers from './src/graphql/resolvers';
import { PORT } from './src/config';

const app = express();

connectToMongo();

const server = new ApolloServer({ typeDefs, resolvers, debug: true });
server.applyMiddleware({ app });

app.use(bodyParser.json());
app.use(cors());

app.use((_, res) => {
  return res.status(404).json({ message: '404 - not found' });
});

app.listen(PORT, () =>
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  )
);
