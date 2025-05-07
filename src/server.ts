import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import usersRouter from './routes/users';
import workoutsRouter from './routes/workouts';
import exercisesRouter from './routes/exercises';


dotenv.config();

const app = express(); // ✅ Moved to the top

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('NinerFit backend is running!');
});

app.use('/users', usersRouter);
app.use('/workouts', workoutsRouter);
app.use('/exercises', exercisesRouter);


app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
