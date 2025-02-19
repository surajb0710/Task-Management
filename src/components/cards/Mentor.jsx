import { useEffect } from 'react';
import { svgs } from '../../assets/assets';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { getTaskByMentorIdApi } from '../../api/apiService';

const Mentor = ({ mentor, comments = true }) => {
  const [averageRating, setAverageRating] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);

  useEffect(() => {
    const averageRating = () => {
      let sum = 0;
      mentor.reviews.map((review) => (sum = sum + review.rating));

      const average = sum / mentor.reviews.length;

      setAverageRating(average);
    };

    mentor.reviews.length > 0 && averageRating();
  }, [mentor.reviews]);

  useEffect(() => {
    const fetchTasks = async (id) => {
      const tasks = await getTaskByMentorIdApi(id);
      setTotalTasks(tasks.length);
    };
    fetchTasks(mentor.id);
  }, [mentor.id]);

  return (
    <div className="p-6 w-full rounded-[10px] bg-white">
      <div className="flex items-center gap-2 mb-6">
        <img
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
          alt=""
          className="h-12 w-12 rounded-full object-cover"
        />
        <div className="grow">
          <p className="text-[#141522] plus-jakarta-sans font-semibold text-base">
            {mentor.name}
          </p>
          <p className="text-[#54577A] plus-jakarta-sans font-medium text-[12px]">
            {mentor.expertise}
          </p>
        </div>
        <button className="bg-none border-none outline-none text-[#546FFF] plus-jakarta-sans font-medium text-sm">
          + Follow
        </button>
      </div>
      {comments &&
        (mentor.reviews.length > 0 ? (
          <div className="text-[#8E92BC] text-sm font-medium mb-6">
            {mentor.reviews[0].comment}
          </div>
        ) : null)}
      <div className="flex justify-between">
        <div className="flex gap-2">
          <img src={svgs.task} alt="" className="h-6 w-6" />
          <p className="text-[#141522] plus-jakarta-sans font-medium text-sm">
            {totalTasks} Tasks
          </p>
        </div>
        <div className="flex gap-2">
          <img src={svgs.star_solid_golden} alt="" className="h-6 w-6" />
          <p className="text-[#141522] plus-jakarta-sans font-medium text-sm">
            {averageRating} ({mentor.reviews.length} Reviews)
          </p>
        </div>
      </div>
    </div>
  );
};

Mentor.propTypes = {
  mentor: PropTypes.object.isRequired,
  comments: PropTypes.bool,
};

export default Mentor;
