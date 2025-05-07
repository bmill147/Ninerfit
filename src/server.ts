import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import usersRouter from './routes/users';
import workoutsRouter from './routes/workouts';
<<<<<<< HEAD
import exercisesRouter from './routes/exercises'; // add if not already
=======

app.use('/workouts', workoutsRouter);

>>>>>>> parent of dfc873a (updates to backend)

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 👇 serve static files from public
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use('/users', usersRouter);
<<<<<<< HEAD
app.use('/workouts', workoutsRouter);
app.use('/exercises', exercisesRouter); // add if not yet
=======
>>>>>>> parent of dfc873a (updates to backend)

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
