import LinearProgress from '@mui/material/LinearProgress';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import { tasks } from '../../assets/assets';
import ImageContainer from '../common/ImageContainer';

const Task = () => {
  return (
    <div className="p-6 rounded-[10px] bg-white flex flex-col gap-4">
      <img src={tasks.task1} alt="" className="h-auto w-full rounded-[10px]" />
      <div>
        <p className="font-semibold text-[#141522] text-base">
          Creating Mobile App Design
        </p>
        <p className="font-medium text-[#54577A] text-sm">UI UX Design</p>
      </div>
      <div>
        <p className="font-medium text-[#141522] text-base">Progress</p>
        <p className="font-medium text-[#54577A] text-base">75%</p>
      </div>
      <LinearProgress
        variant="determinate"
        value={60}
        size="lg"
        thickness={2}
        style={{
          color: '#546FFF',
        }}
        className="w-full h-2"
      />
      <div className="flex justify-between">
        <div className="flex gap-2.5">
          <AccessTimeOutlinedIcon
            style={{
              color: '#54577A',
            }}
          />
          <p className="font-medium text-[#141522] text-base">3 Days Left</p>
        </div>
        <div className="relative right-0">
          <ImageContainer />
        </div>
      </div>
    </div>
  );
};

export default Task;
