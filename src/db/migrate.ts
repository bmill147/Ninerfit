import { db } from './index';

async function migrate() {
  await db.schema
    .createTable('users')
    .ifNotExists()
    .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
    .addColumn('username', 'text', col => col.notNull())
    .addColumn('email', 'text', col => col.notNull())
    .addColumn('password', 'text', col => col.notNull())
    .addColumn('created_at', 'text', col => col.defaultTo(new Date().toISOString()))
    .execute();

  await db.schema
    .createTable('workouts')
    .ifNotExists()
    .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
    .addColumn('user_id', 'integer', col => col.references('users.id'))
    .addColumn('name', 'text', col => col.notNull())
    .addColumn('date', 'text', col => col.notNull())
    .execute();

  await db.schema
    .createTable('exercises')
    .ifNotExists()
    .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
    .addColumn('workout_id', 'integer', col => col.references('workouts.id'))
    .addColumn('name', 'text', col => col.notNull())
    .addColumn('sets', 'integer')
    .addColumn('reps', 'integer')
    .addColumn('weight', 'integer')
    .execute();

  console.log('✅ Tables created');
  process.exit(0);
}

migrate();
