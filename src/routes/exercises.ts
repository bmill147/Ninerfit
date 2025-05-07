import { Router } from 'express';
import { db } from '../db/index';
import { Insertable } from 'kysely';
import type { DB } from '../db/schema';

const router = Router();

// GET /exercises or /exercises?workout_id=3
router.get('/', async (req, res) => {
  const workoutId = req.query.workout_id;

  try {
    let exercises;

    if (workoutId) {
      exercises = await db
        .selectFrom('exercises')
        .selectAll()
        .where('workout_id', '=', Number(workoutId))
        .execute();
    } else {
      exercises = await db.selectFrom('exercises').selectAll().execute();
    }

    res.json(exercises);
  } catch (err) {
    console.error('Failed to fetch exercises:', err);
    res.status(500).json({ error: 'Failed to get exercises' });
  }
});

// POST /exercises
router.post('/', async (req, res) => {
  const { workout_id, name, sets, reps, weight } = req.body;

  try {
    const newExercise: Insertable<DB['exercises']> = {
      workout_id,
      name,
      sets,
      reps,
      weight,
    };

    const result = await db
      .insertInto('exercises')
      .values(newExercise)
      .returningAll()
      .executeTakeFirst();

    res.status(201).json(result);
  } catch (err) {
    console.error('Insert exercise failed:', err);
    res.status(500).json({ error: 'Exercise creation failed' });
  }
});

// PUT /exercises/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, sets, reps, weight } = req.body;

  try {
    const updated = await db
      .updateTable('exercises')
      .set({ name, sets, reps, weight })
      .where('id', '=', Number(id))
      .returningAll()
      .executeTakeFirst();

    res.json(updated);
  } catch (err) {
    console.error('Update failed:', err);
    res.status(500).json({ error: 'Update failed' });
  }
});

// DELETE /exercises/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await db.deleteFrom('exercises').where('id', '=', Number(id)).execute();
    res.status(204).send();
  } catch (err) {
    console.error('Delete failed:', err);
    res.status(500).json({ error: 'Delete failed' });
  }
});

export default router;
