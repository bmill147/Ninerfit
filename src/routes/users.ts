// src/routes/users.ts
import { Router } from 'express';
import { db } from '../db/index';

const router = Router();

// GET /users - return all users
router.get('/', async (req, res) => {
  try {
    const users = await db.selectFrom('users').selectAll().execute();
    res.json(users);
  } catch (err) {
    console.error('Failed to get users:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
