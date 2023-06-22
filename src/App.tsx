import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import Error from './routes/Error';
import ProtectedRoute from './components/ProtectedRoute';
import Auth from './routes/Auth';
import User from './routes/User';

export default function App() {
  return (
    <Router>
      <RootLayout>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute redirectTo="/auth/login">
                <div>Home</div>
              </ProtectedRoute>
            }
          />
          <Route path="/auth/:type" element={<Auth />} />
          <Route
            path="/user"
            element={
              <ProtectedRoute redirectTo="/auth/login">
                <User />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </RootLayout>
    </Router>
  );
}
