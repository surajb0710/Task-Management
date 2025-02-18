import Header from '../components/Header';
import Calendar from '../components/Calendar';
import TaskToday from '../components/layout/TaskToday';
import RunningTask from '../components/cards/RunningTask';
import MonthlyMentor from '../components/cards/MonthlyMentor';
import UpcomingTask from '../components/cards/Task';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Chart from '../components/cards/Chart';

const Dashboard = () => {
  return (
    <div className="flex">
      <div className="grow bg-[#FAFAFA]">
        <Header />
        <div className="flex mb-8 gap-8 px-8 max-h-[214px]">
          <RunningTask />
          <Chart />
        </div>
        <div className="px-8 mb-8">
          <div className="flex justify-between mb-5">
            <p className="text-2xl font-semibold text-[#141522]">
              Monthly Mentors
            </p>
            <div className="flex gap-2.5">
              <ArrowBackIosIcon />
              <ArrowForwardIosIcon />
            </div>
          </div>
          <div className="flex gap-8">
            <MonthlyMentor />
            <MonthlyMentor />
          </div>
        </div>
        <div className="px-8 mb-8">
          <div className="">
            <div className="flex justify-between mb-5">
              <p className="text-2xl font-semibold text-[#141522]">
                Upcoming Task
              </p>
              <div className="flex gap-2.5">
                <ArrowBackIosIcon />
                <ArrowForwardIosIcon />
              </div>
            </div>
            <div className="flex gap-8">
              <UpcomingTask />
              <UpcomingTask />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8 p-6 shrink-0">
        <Calendar />
        <TaskToday />
      </div>
    </div>
  );
};

export default Dashboard;
