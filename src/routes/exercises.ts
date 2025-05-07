import { Router } from 'express';
import { db } from '../db/index';
import { Insertable } from 'kysely';
import type { DB } from '../db/schema';

const router = Router();

// GET /exercises - fetch all exercises
// GET /exercises?workout_id=3
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
  

// POST /exercises - create a new exercise
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

export default router;
