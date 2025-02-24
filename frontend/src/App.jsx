import Header from './components/Header';
import AuthProvider from './context/AuthProvider';
import Sidebar from './components/Sidebar';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Settings from './pages/Settings';
import Dashboard from './pages/Dashboard';
import Mentors from './pages/Mentors';
import Messages from './pages/Messages';
import Tasks from './pages/Tasks';
import { useLocation } from 'react-router-dom';
import AddTask from './components/forms/AddTask';
import { useState } from 'react';
import Login from './components/forms/Login';
import Register from './components/forms/Register';

import ProtectedRoute from './components/ProtectedRoute';

const Layout = () => {
  const location = useLocation();
  const [showAddTaskModel, setShowAddTaskModel] = useState(false);

  return (
    <AuthProvider>
      <div className="bg-[#F5F5F7] flex max-w-screen">
        {location.pathname !== '/register' &&
          location.pathname !== '/login' && (
            <Sidebar setShowAddTaskModel={setShowAddTaskModel} />
          )}
        {showAddTaskModel && (
          <AddTask setShowAddTaskModel={setShowAddTaskModel} />
        )}
        <div className="grow">
          {location.pathname !== '/' &&
            location.pathname !== '/register' &&
            location.pathname !== '/login' && <Header />}
          <div className="">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/mentors"
                element={
                  <ProtectedRoute>
                    <Mentors />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/messages"
                element={
                  <ProtectedRoute>
                    <Messages />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tasks"
                element={
                  <ProtectedRoute>
                    <Tasks />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <Layout />
    </BrowserRouter>
  );
};

export default App;
