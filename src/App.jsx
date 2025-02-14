import Calendar from './components/Calendar';
import ActivityChart from './components/cards/ActivityChart';
import RunningTask from './components/cards/RunningTask';
import MonthlyMentor from './components/cards/MonthlyMentor';

const App = () => {
  return (
    <div className="bg-[#F5F5F7]">
      App
      <RunningTask />
      <ActivityChart />
      <Calendar />
      <MonthlyMentor />
    </div>
  );
};

export default App;
