import { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';

function App() {
  const [userId, setUserId] = useState<number | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => {
      const newDarkMode = !prevDarkMode;
      if (newDarkMode) {
        localStorage.setItem('theme', 'dark');
        document.documentElement.classList.add('dark');
      } else {
        localStorage.setItem('theme', 'light');
        document.documentElement.classList.remove('dark');
      }
      return newDarkMode;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      {/* Dark mode toggle button with a box around it */}
      <button
        className="absolute top-4 left-4 p-2 text-xs bg-primary text-white rounded-lg border-2 border-primary focus:outline-none"
        onClick={toggleDarkMode}
      >
        DM
      </button>

      {userId ? (
        <Dashboard userId={userId} onLogout={() => setUserId(null)} />
      ) : (
        <LoginForm onLogin={(id) => setUserId(id)} />
      )}
    </div>
  );
}

export default App;
