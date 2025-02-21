import Header from '../components/Header';
import Calendar from '../components/Calendar';
import TaskToday from '../components/layout/TaskToday';
import RunningTask from '../components/cards/RunningTask';

import Chart from '../components/cards/Chart';
import { useState, useEffect } from 'react';
import { getMonthlyMentorsApi } from '../api/apiService';
import MonthlyMentors from '../components/layout/MonthlyMentors';
import UpcomingTask from '../components/layout/UpcomingTask';

const Dashboard = () => {
  const [monthlyMentors, setMonthlyMentors] = useState([]);

  useEffect(() => {
    const fetchMentors = async () => {
      const mentors = await getMonthlyMentorsApi();
      setMonthlyMentors(mentors);
    };
    fetchMentors();
  }, []);

  return (
    <div className="flex ml-[254px]">
      <div className="grow bg-[#FAFAFA]">
        <Header />
        <div className="flex mb-8 gap-8 px-8 max-h-[214px]">
          <RunningTask />
          <Chart />
        </div>
        <div className="px-8 mb-8">
          <MonthlyMentors monthlyMentors={monthlyMentors} />
        </div>
        <div className="px-8 mb-8">
          <UpcomingTask />
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
