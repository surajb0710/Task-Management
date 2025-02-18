import AllMentors from '../components/layout/AllMentors';
import RecentMentors from '../components/layout/RecentMentors';

const Mentors = () => {
  return (
    <div className="w-full px-4 py-8 flex flex-col gap-8">
      <RecentMentors />
      <AllMentors />
    </div>
  );
};

export default Mentors;
