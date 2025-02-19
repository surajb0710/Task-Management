import Timelimit from '../components/layout/TimeLimit';
import NewTasks from '../components/layout/NewTasks';
import { getTodaysTasksApi, getAllTasksApi } from '../api/apiService';
import { useState, useEffect } from 'react';

const Tasks = () => {
  const [todaysTasks, setTodaysTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const date = new Date();

      const todaysDate = `${date.getFullYear()}-${String(
        date.getUTCMonth() + 1
      ).padStart(2, '0')}-${date.getDate()}`;
      const tasks = await getTodaysTasksApi(todaysDate);
      setTodaysTasks(tasks);
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getAllTasksApi();
      setAllTasks(tasks);
    };
    fetchTasks();
  }, []);

  return (
    <div className="w-full p-8 flex flex-col gap-8">
      {todaysTasks.length !== 0 && <Timelimit todaysTasks={todaysTasks} />}
      {allTasks.length !== 0 && <NewTasks allTasks={allTasks} />}
    </div>
  );
};

export default Tasks;
