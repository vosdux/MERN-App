import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from './routes';
import 'materialize-css';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';

const App: React.FC = () => {
  const { token, login, logout, userId } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  return (
    <AuthContext.Provider value={{ token, login, logout, userId }}>
      <Router>
        <div className="container">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
