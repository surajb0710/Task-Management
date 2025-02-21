import Timelimit from '../components/layout/TimeLimit';
import NewTasks from '../components/layout/NewTasks';

const Tasks = () => {
  return (
    <div className="w-full p-8 flex flex-col gap-8 ml-[254px]">
      <Timelimit />
      <NewTasks />
    </div>
  );
};

export default Tasks;
