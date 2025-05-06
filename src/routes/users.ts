import { Router } from 'express';
import { db } from '../db/index';
import { Insertable } from 'kysely';
import type { InsertableUser } from '../db/schema'; // ✅ type from schema

const router = Router();

// GET /users - fetch all users
router.get('/', async (_req, res) => {
  try {
    const users = await db.selectFrom('users').selectAll().execute();
    res.json(users);
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /users - create a new user
router.post('/', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const newUser: Insertable<InsertableUser> = {
      username,
      email,
      password,
      created_at: new Date().toISOString(),
    };

    const result = await db
      .insertInto('users')
      .values(newUser)
      .returningAll()
      .executeTakeFirst();

    res.status(201).json(result);
  } catch (err) {
    console.error('Insert user failed:', err);
    res.status(500).json({ error: 'User creation failed' });
  }
});

export default router;
