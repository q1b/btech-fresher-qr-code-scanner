import { drizzle } from 'drizzle-orm/libsql';
import { fresherTable } from './table';

export const db = drizzle({ 
  connection: { 
    url: process.env.DATABASE_URL!, 
    authToken: process.env.DATABASE_AUTH_TOKEN!
  },
  schema: {
    fresherTable,
  }
});