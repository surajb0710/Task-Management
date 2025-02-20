import Mentor from '../cards/Mentor';
import PropTypes from 'prop-types';

const AllMentors = ({ allMentors }) => {
  return (
    <section className="px-4">
      <div className="flex justify-between">
        <p className="text-2xl font-semibold leading-[1.5] text-[#141522] mb-[18px]">
          Mentors
        </p>
      </div>
      <div className="grid grid-cols-3 gap-8">
        {allMentors.map((mentor, index) => (
          <Mentor key={index} mentor={mentor} />
        ))}
      </div>
    </section>
  );
};

AllMentors.propTypes = {
  allMentors: PropTypes.array.isRequired,
};

export default AllMentors;
