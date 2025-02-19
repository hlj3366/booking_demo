import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import mongoose from 'mongoose';
import winston from 'winston';
import typeDefs from './schema.js';
import resolvers from './resolvers.js';
import 'dotenv/config';

// Configure logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
  ],
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => logger.info('Connected to MongoDB'))
  .catch(err => logger.error('MongoDB connection error:', err));

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start server
startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  logger.info(`🚀 Server ready at ${url}`);
});
