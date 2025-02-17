import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Settings from './pages/Settings';
import Dashboard from './pages/Dashboard';
import Mentors from './pages/Mentors';
import Messages from './pages/Messages';
import Tasks from './pages/Tasks';

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <div className="bg-[#F5F5F7] flex">
        <Sidebar />
        <div className="grow">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/mentors" element={<Mentors />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
