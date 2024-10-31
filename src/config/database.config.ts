// const database = {
//   host: process.env.DATABASE_HOST,
//   port: parseInt(process.env.DATABASE_PORT),
//   username: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASS,
//   database: process.env.DATABASE_NAME,
// };

// export const mongodb_url = `mongodb://${database.username}:${database.password}@${database.host}:${database.port}/${database.database}?serverSelectionTimeoutMS=2000&authSource=admin`;

import { registerAs } from '@nestjs/config';

const isDevelopment = process.env.NODE_ENV !== 'production';

/**
 * Mongo database connection config
 */
export default registerAs('mongodb', () => {
  const database = {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
  };
  return {
    uri: `mongodb://${database.username}:${database.password}@${database.host}:${database.port}/${database.database}?serverSelectionTimeoutMS=2000&authSource=admin`,
  };
});
