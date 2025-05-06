export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    created_at: string;
  }
  
  export interface Workout {
    id: number;
    user_id: number;
    name: string;
    date: string;
  }
  
  export interface Exercise {
    id: number;
    workout_id: number;
    name: string;
    sets: number;
    reps: number;
    weight: number;
  }
  
  // Main DB schema for Kysely
  export interface DB {
    users: User;
    workouts: Workout;
    exercises: Exercise;
  }
  
  export type InsertableUser = Omit<User, 'id'>;
  export type InsertableWorkout = Omit<Workout, 'id'>;

  