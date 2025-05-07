import { useState } from 'react';

type Props = {
  onLogin: (userId: number) => void;
};

export default function LoginForm({ onLogin }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3000/users');
      const users = await res.json();

      const match = users.find(
        (u: any) => u.username === username && u.password === password
      );

      if (match) {
        onLogin(match.id);
      } else {
        alert('Invalid username or password');
      }
    } catch (err) {
      console.error('Login failed', err);
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin} className="p-6 space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold">Login</h2>
      <input
        className="w-full border p-2"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        className="w-full border p-2"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className="w-full bg-green-600 text-white p-2 rounded">
        Log In
      </button>
    </form>
  );
}
