import { Router } from 'express';
import { db } from '../db/index';
import { Insertable } from 'kysely';
import type { DB } from '../db/schema'; 

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
    const newUser: Insertable<DB['users']> = {
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


// PUT /users/:id - update a user
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;
  
    try {
      const updated = await db
        .updateTable('users')
        .set({ username, email, password })
        .where('id', '=', Number(id))
        .returningAll()
        .executeTakeFirst();
  
      res.json(updated);
    } catch (err) {
      console.error('Update user failed:', err);
      res.status(500).json({ error: 'Update failed' });
    }
  });
  
  // DELETE /users/:id - delete a user
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      await db.deleteFrom('users').where('id', '=', Number(id)).execute();
      res.status(204).send();
    } catch (err) {
      console.error('Delete user failed:', err);
      res.status(500).json({ error: 'Delete failed' });
    }
  });
  

export default router;
