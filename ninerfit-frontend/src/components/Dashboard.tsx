import { useEffect, useState } from 'react';
import ExerciseList from './ExerciseList'; // Ensure this is the correct import path

type Workout = {
  id: number;
  user_id: number;
  name: string;
  date: string;
};

type Props = {
  userId: number;
  onLogout: () => void;
};

export default function Dashboard({ userId, onLogout }: Props) {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');

  // Fetch workouts
  const fetchWorkouts = async () => {
    const res = await fetch('http://localhost:3000/workouts');
    const data = await res.json();
    setWorkouts(data.filter((w: Workout) => w.user_id === userId));
  };

  useEffect(() => {
    fetchWorkouts();
  }, [userId]);

  // Add new workout
  const addWorkout = async () => {
    if (!name || !date) return;

    await fetch('http://localhost:3000/workouts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, name, date }),
    });

    setName('');
    setDate('');
    fetchWorkouts();
  };

  // Delete workout
  const deleteWorkout = async (id: number) => {
    await fetch(`http://localhost:3000/workouts/${id}`, { method: 'DELETE' });
    fetchWorkouts();
  };

  const today = new Date().toISOString().split('T')[0];
  const past = workouts.filter((w) => w.date < today);
  const upcoming = workouts.filter((w) => w.date >= today);

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Welcome, User #{userId}</h1>
        <button onClick={onLogout} className="text-red-600 underline">Log out</button>
      </div>

      {/* Add Workout Form */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Add Workout</h2>
        <input
          type="text"
          placeholder="Workout Name"
          className="border p-2 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 w-full"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={addWorkout} className="bg-green-600 text-white p-2 rounded">
          Add Workout
        </button>
      </div>

      {/* Upcoming Workouts */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Upcoming Workouts</h2>
        <ul className="space-y-2 list-none p-0">
          {upcoming.map((w) => (
            <li
              key={w.id}
              className="rounded-lg border p-4 bg-gray-800 text-white hover:bg-gray-700 cursor-pointer shadow-md transition-all"
              onClick={() => setSelectedWorkoutId(selectedWorkoutId === w.id ? null : w.id)}
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold">{w.name}</span> 
                <span className="text-sm text-gray-400">on {w.date}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteWorkout(w.id);
                }}
                className="text-red-500 hover:underline mt-2"
              >
                Delete
              </button>
              {selectedWorkoutId === w.id && (
                <div className="mt-2">
                  <ExerciseList workoutId={w.id} />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Past Workouts */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Past Workouts</h2>
        <ul className="space-y-2 list-none p-0">
          {past.map((w) => (
            <li
              key={w.id}
              className="rounded-lg border p-4 bg-gray-700 text-white hover:bg-gray-600 cursor-pointer shadow-md transition-all"
              onClick={() => setSelectedWorkoutId(selectedWorkoutId === w.id ? null : w.id)}
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold">{w.name}</span> 
                <span className="text-sm text-gray-400">on {w.date}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteWorkout(w.id);
                }}
                className="text-red-500 hover:underline mt-2"
              >
                Delete
              </button>
              {selectedWorkoutId === w.id && (
                <div className="mt-2">
                  <ExerciseList workoutId={w.id} />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
