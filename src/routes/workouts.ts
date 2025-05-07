import { Router } from 'express';
import { db } from '../db/index';
import { Insertable } from 'kysely';
import type { DB } from '../db/schema';

const router = Router();

// GET /workouts - fetch all workouts
router.get('/', async (_req, res) => {
  try {
    const workouts = await db.selectFrom('workouts').selectAll().execute();
    res.json(workouts);
  } catch (err) {
    console.error('Failed to fetch workouts:', err);
    res.status(500).json({ error: 'Failed to get workouts' });
  }
});

// POST /workouts - create a new workout
router.post('/', async (req, res) => {
  const { user_id, name, date } = req.body;

  try {
    const newWorkout: Insertable<DB['workouts']> = {
        user_id,
      name,
      date,
    };

    const result = await db
      .insertInto('workouts')
      .values(newWorkout)
      .returningAll()
      .executeTakeFirst();

    res.status(201).json(result);
  } catch (err) {
    console.error('Insert workout failed:', err);
    res.status(500).json({ error: 'Workout creation failed' });
  }
});


// PUT /workouts/:id - update a workout
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, date } = req.body;

  try {
    const updated = await db
      .updateTable('workouts')
      .set({ name, date })
      .where('id', '=', Number(id))
      .returningAll()
      .executeTakeFirst();

    res.json(updated);
  } catch (err) {
    console.error('Update workout failed:', err);
    res.status(500).json({ error: 'Update failed' });
  }
});

// DELETE /workouts/:id - delete a workout
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await db.deleteFrom('workouts').where('id', '=', Number(id)).execute();
    res.status(204).send();
  } catch (err) {
    console.error('Delete workout failed:', err);
    res.status(500).json({ error: 'Delete failed' });
  }
});


export default router;
