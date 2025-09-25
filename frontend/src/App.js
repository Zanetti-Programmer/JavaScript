import React, { useState } from 'react';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      {isLoggedIn ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

const Login = ({ onLogin }) => {
  return (
    <div>
      <h2>Login</h2>
      <button onClick={onLogin}>Log In</button>
    </div>
  );
};

const Dashboard = ({ onLogout }) => {
  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={onLogout}>Log Out</button>
    </div>
  );
};

export default App;
