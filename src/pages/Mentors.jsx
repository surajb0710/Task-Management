import AllMentors from '../components/layout/AllMentors';
import RecentMentors from '../components/layout/RecentMentors';
import { useState, useEffect } from 'react';
import { getAllMentorsApi, getRecentMentorsApi } from '../api/apiService';

const Mentors = () => {
  const [allMentors, setAllMentors] = useState([]);
  const [recentMentors, setRecentMentors] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const mentors = await getAllMentorsApi();
      setAllMentors(mentors);
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      const mentors = await getRecentMentorsApi();
      setRecentMentors(mentors);
    };
    fetchTasks();
  }, []);

  return (
    <div className="w-full px-4 py-8 flex flex-col gap-8 ml-[254px]">
      {recentMentors.length > 0 && (
        <RecentMentors recentMentors={recentMentors} />
      )}
      {allMentors.length > 0 && <AllMentors allMentors={allMentors} />}
    </div>
  );
};

export default Mentors;
