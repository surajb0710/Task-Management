import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PropTypes from 'prop-types';

export default function BasicDatePicker({ setSelectedDate }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Select Due Date"
        onChange={(newDate) => {
          return setSelectedDate(newDate);
        }}
        sx={{
          // Style the input field
          '.MuiOutlinedInput-root': {
            backgroundColor: '#f3f3f3',
            borderRadius: '8px',
          },
          // Style label text
          '.MuiInputLabel-root': {
            color: '#8E92BC',
            fontSize: '16px',
          },
          // Change calendar icon color
          '.MuiSvgIcon-root': {
            color: 'green',
          },
        }}
      />
    </LocalizationProvider>
  );
}

BasicDatePicker.propTypes = {
  setSelectedDate: PropTypes.func.isRequired,
};
