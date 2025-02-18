import { svgs } from '../../assets/assets';

const MonthlyMentors = () => {
  return (
    <div className="p-6 w-full rounded-[10px] bg-white">
      <div className="flex items-center gap-2 mb-5">
        <img
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
          alt=""
          className="h-12 w-12 rounded-full object-cover"
        />
        <div className="grow">
          <p className="text-[#141522] plus-jakarta-sans font-semibold text-base">
            Curious George
          </p>
          <p className="text-[#54577A] plus-jakarta-sans font-medium text-[12px]">
            UIUX Design
          </p>
        </div>
        <button className="bg-none border-none outline-none text-[#546FFF] plus-jakarta-sans font-medium text-sm">
          + Follow
        </button>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <img src={svgs.task} alt="" className="h-6 w-6" />
          <p className="text-[#141522] plus-jakarta-sans font-medium text-sm">
            40 Tasks
          </p>
        </div>
        <div className="flex gap-2">
          <img src={svgs.star_solid_golden} alt="" className="h-6 w-6" />
          <p className="text-[#141522] plus-jakarta-sans font-medium text-sm">
            4.7 (750 Reviews)
          </p>
        </div>
      </div>
    </div>
  );
};

export default MonthlyMentors;
