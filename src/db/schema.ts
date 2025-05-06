export interface User {
    id: number;
    username: string;
    email: string;
    password: string; // hashed
    created_at: Date;
  }
  
  export interface Workout {
    id: number;
    user_id: number;
    name: string;
    date: Date;
  }
  
  export interface Exercise {
    id: number;
    workout_id: number;
    name: string;
    sets: number;
    reps: number;
    weight: number;
  }
  
  // This is the DB interface used by Kysely
  export interface DB {
    users: User;
    workouts: Workout;
    exercises: Exercise;
  }
  