import PropType from 'prop-types';

const RoundProgressBar = ({ percentage, boxSize }) => {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = ((100 - percentage) / 100) * circumference;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${boxSize} ${boxSize}`}
      className="-rotate-90"
    >
      <circle
        cx="34"
        cy="34"
        r={radius}
        fill="transparent"
        stroke="#FFF"
        strokeWidth="4"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
      />
    </svg>
  );
};

RoundProgressBar.propTypes = {
  percentage: PropType.number.isRequired,
  boxSize: PropType.number.isRequired,
};

export default RoundProgressBar;
