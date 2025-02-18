import Mentor from '../cards/Mentor';

const AllMentors = () => {
  return (
    <section className="px-4">
      <div className="flex justify-between">
        <p className="text-2xl font-semibold leading-[1.5] text-[#141522] mb-[18px]">
          Mentors
        </p>
      </div>
      <div className="grid grid-cols-3 gap-8">
        <Mentor />
        <Mentor />
        <Mentor />
        <Mentor />
        <Mentor />
        <Mentor />
        <Mentor />
        <Mentor />
        <Mentor />
        <Mentor />
      </div>
    </section>
  );
};

export default AllMentors;
