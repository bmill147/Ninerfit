import { useEffect, useState } from 'react';

type Exercise = {
  id: number;
  workout_id: number;
  name: string;
  sets: number;
  reps: number;
  weight: number;
};

type Props = {
  workoutId: number;
};

const ExerciseList = ({ workoutId }: Props) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3000/exercises?workout_id=${workoutId}`)
      .then((res) => res.json())
      .then((data) => setExercises(data));
  }, [workoutId]);

  return (
    <div className="mt-4">
      <h4 className="text-lg font-semibold mb-2">Exercises</h4>
      {exercises.length === 0 ? (
        <p className="text-gray-500">No exercises logged yet.</p>
      ) : (
        <ul className="space-y-2">
          {exercises.map((ex) => (
            <li key={ex.id} className="p-3 bg-white rounded shadow">
              <strong>{ex.name}</strong> — {ex.sets} sets x {ex.reps} reps @ {ex.weight} lbs
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExerciseList;
