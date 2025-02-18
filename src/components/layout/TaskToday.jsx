import UpcomingTask from '../cards/Task';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const TaskToday = () => {
  return (
    <div className="max-w-[372px] p-6 bg-white rounded-[10px]">
      <div className="flex justify-between mb-5">
        <p>Task Today</p>
        <MoreHorizIcon />
      </div>
      <UpcomingTask />
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
