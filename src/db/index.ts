import { Kysely, SqliteDialect } from 'kysely';
import Database from 'better-sqlite3';
import { DB } from './schema';

export const db = new Kysely<DB>({
  dialect: new SqliteDialect({
    database: new Database('ninerfit.db'),
  }),
});
