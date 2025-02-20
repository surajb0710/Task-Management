import Task from '../cards/Task';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { getTodaysTasksApi } from '../../api/apiService';
import { useState, useEffect } from 'react';

const TaskToday = () => {
  const [todaysTask, setTodaysTask] = useState({});

  useEffect(() => {
    const fetchTasks = async () => {
      const date = new Date();

      const todaysDate = `${date.getFullYear()}-${String(
        date.getUTCMonth() + 1
      ).padStart(2, '0')}-${date.getDate()}`;
      const tasks = await getTodaysTasksApi(todaysDate);
      setTodaysTask(tasks[0]);
    };
    fetchTasks();
  }, []);

  console.log('----------todays task------', todaysTask);

  return (
    <div className="max-w-[372px] p-6 bg-white rounded-[10px]">
      <div className="flex justify-between mb-5">
        <p>Task Today</p>
        <MoreHorizIcon />
      </div>
      {todaysTask.id !== '' && <Task task={todaysTask} />}
      <hr />
      <div className="mt-8">
        <div className="flex justify-between mb-5">
          <p>Detail Task</p>
          <p>UI / UX Designer</p>
        </div>
        <div className="flex gap-3 mb-5">
          <p className="w-8 h-8 flex items-center justify-center text-sm font-semibold text-[#141522] bg-[#F5F5F7] rounded-[10px]">
            1
          </p>
          <p className="text-sm font-semibold text-[#141522]">
            Understanding the tools in Figma
          </p>
        </div>
        <div className="flex gap-3 mb-5">
          <p className="w-8 h-8 flex items-center justify-center text-sm font-semibold text-[#141522] bg-[#F5F5F7] rounded-[10px]">
            2
          </p>
          <p className="text-sm font-semibold text-[#141522]">
            Understanding the tools in Figma
          </p>
        </div>
        <div className="flex gap-3 mb-[56px]">
          <p className="w-8 h-8 flex items-center justify-center text-sm font-semibold text-[#141522] bg-[#F5F5F7] rounded-[10px]">
            3
          </p>
          <p className="text-sm font-semibold text-[#141522]">
            Understanding the tools in Figma
          </p>
        </div>
      </div>
      <button
        type="button"
        className="bg-[#546FFF] rounded-[10px] w-full py-3 text-sm font-semibold text-white"
      >
        Go to Detail
      </button>
    </div>
  );
};

export default TaskToday;
