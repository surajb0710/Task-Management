import LinearProgress from '@mui/material/LinearProgress';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import ImageContainer from '../common/ImageContainer';
import PropTypes from 'prop-types';
import { getPendingTime } from '../../utils/dateFormat';

const Task = ({ task }) => {
  const pendingTime = getPendingTime(task.dueDate);

  return (
    <div className="p-6 rounded-[10px] bg-white flex flex-col gap-4">
      {task?.media?.length > 0
        ? task.media.map((item, index) => {
            return (
              <img
                src={item.mediaUrl}
                alt=""
                className="h-auto w-full rounded-[10px]"
                key={index}
              />
            );
          })
        : null}
      <div>
        <p className="font-semibold text-[#141522] text-base">{task.title}</p>
        <p className="font-medium text-[#54577A] text-sm">{task.category}</p>
      </div>
      <div className="flex justify-between">
        <p className="font-medium text-[#141522] text-base">Progress</p>
        <p className="font-medium text-[#54577A] text-base">{task.progress}%</p>
      </div>
      <LinearProgress
        variant="determinate"
        value={task.progress === undefined ? 0 : task.progress}
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
          <p className="font-medium text-[#141522] text-base">{pendingTime}</p>
        </div>
        {task?.assignee != undefined ? (
          <div className="relative right-0">
            <ImageContainer assignee={task.assignee} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

Task.propTypes = {
  task: PropTypes.object.isRequired,
};

export default Task;
