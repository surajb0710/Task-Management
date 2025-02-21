import { CircularProgress, Box } from '@mui/material';
import PropTypes from 'prop-types';

const RoundProgressBar = ({ percentage }) => {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress
        variant="determinate"
        value={percentage}
        size={68}
        thickness={2}
        style={{
          color: '#546FFF',
        }}
      />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        style={{
          transform: 'translate(-50%, -50%)',
          fontSize: '16px',
          fontWeight: 'bold',
          color: 'white',
        }}
      >
        {`${percentage}%`}
      </Box>
    </Box>
  );
};

RoundProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired,
};

export default RoundProgressBar;
