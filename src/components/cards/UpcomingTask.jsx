import LinearProgress from '@mui/material/LinearProgress';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import { tasks } from '../../assets/assets';
import ImageContainer from '../common/ImageContainer';

const UpcomingTask = () => {
  return (
    <div>
      <img
        src={tasks.task1}
        alt=""
        className="h-[110px] w-[280px] rounded-[10px]"
      />
      <div>
        <p>Creating Mobile App Design</p>
        <p>UI UX Design</p>
      </div>
      <div>
        <p>Progress</p>
        <p>75%</p>
      </div>
      <LinearProgress
        variant="determinate"
        value={60}
        size={68}
        thickness={2}
        style={{
          color: '#546FFF',
        }}
        className="w-[280px]"
      />
      <div className="flex justify-between max-w-[280px]">
        <div className="flex">
          <AccessTimeOutlinedIcon />
          <p>3 Days Left</p>
        </div>
        <div className="relative right-0">
          <ImageContainer />
        </div>
      </div>
    </div>
  );
};

export default UpcomingTask;
