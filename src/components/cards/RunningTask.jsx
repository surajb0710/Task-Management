import RoundProgressBar from '../common/RoundProgressBar/RoundProgressBar';

const RunningTask = () => {
  return (
    <div className="flex flex-col gap-4 w-[194px] rounded-lg bg-black px-[18px] py-[16px]">
      <h2 className="text-white plus-jakarta-sans font-semibold text-base">
        Running Task
      </h2>
      <p className="text-white plus-jakarta-sans font-semibold text-[32px]">
        65
      </p>
      <div className="flex gap-[18px] items-center">
        <div className="h-[68px] w-[68px]">
          <RoundProgressBar percentage={60} />
        </div>
        <div className="flex flex-col gap-1">
          <strong className="text-white plus-jakarta-sans font-semibold text-xl">
            100
          </strong>
          <small className="text-[#8E92BC] plus-jakarta-sans font-medium text-sm">
            Task
          </small>
        </div>
      </div>
    </div>
  );
};

export default RunningTask;
