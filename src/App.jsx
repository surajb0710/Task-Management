import Header from './components/Header';
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

const Layout = () => {
  const location = useLocation();
  const [showAddTaskModel, setShowAddTaskModel] = useState(true);

  return (
    <div className="bg-[#F5F5F7] flex max-w-screen">
      <Sidebar setShowAddTaskModel={setShowAddTaskModel} />
      {showAddTaskModel && (
        <AddTask setShowAddTaskModel={setShowAddTaskModel} />
      )}
      <div className="grow ml-[254px]">
        {location.pathname !== '/' && <Header />}
        <div className="">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/mentors" element={<Mentors />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
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
