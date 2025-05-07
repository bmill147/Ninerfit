import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import usersRouter from './routes/users';
import workoutsRouter from './routes/workouts';
import exercisesRouter from './routes/exercises'; // add if not already

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


app.use('/users', usersRouter);
app.use('/workouts', workoutsRouter);
app.use('/exercises', exercisesRouter); // add if not yet

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
