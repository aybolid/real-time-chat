import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import ProtectedRoute from './components/utils/ProtectedRoute';
import Error from './routes/Error';
import Auth from './routes/Auth';
import User from './routes/User';
import Home from './routes/Home';
import React from 'react';

const protect = (component: React.ReactNode, redirectTo = '/auth/login') => {
  return <ProtectedRoute redirectTo={redirectTo}>{component}</ProtectedRoute>;
};

export default function App() {
  return (
    <Router>
      <RootLayout>
        <Routes>
          {/* Protected Routes  */}
          <Route path="/" element={protect(<Home />)} />
          <Route path="/user" element={protect(<User />)} />
          {/* Public Routes */}
          <Route path="/auth/:type" element={<Auth />} />
          {/* Error Page */}
          <Route path="*" element={<Error />} />
        </Routes>
      </RootLayout>
    </Router>
  );
}
