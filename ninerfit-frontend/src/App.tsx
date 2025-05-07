import { useState } from 'react';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';

function App() {
  const [userId, setUserId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {userId ? (
        <Dashboard userId={userId} onLogout={() => setUserId(null)} />
      ) : (
        <LoginForm onLogin={(id) => setUserId(id)} />
      )}
    </div>
  );
}

export default App;
