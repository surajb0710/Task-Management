import Multiselect from 'multiselect-react-dropdown';
import PropTypes from 'prop-types';

const MultiSelectDropdown = ({ setMethod }) => {
  return (
    <Multiselect
      displayValue="key"
      onRemove={(selectedList) =>
        setMethod(selectedList.map((item) => item.key))
      }
      onSelect={(selectedList) =>
        setMethod(selectedList.map((item) => item.key))
      }
      className="w-full border border-[#CCCCCC] text-[#8E92BC] text-base py-[16.5px] px-[14px] rounded-[4px]"
      style={{ searchBox: { border: 'none', padding: 0, color: '#8E92BC' } }}
      options={[
        {
          cat: 'Group 1',
          key: 'Option 1',
        },
        {
          cat: 'Group 1',
          key: 'Option 2',
        },
        {
          cat: 'Group 1',
          key: 'Option 3',
        },
        {
          cat: 'Group 2',
          key: 'Option 4',
        },
        {
          cat: 'Group 2',
          key: 'Option 5',
        },
        {
          cat: 'Group 2',
          key: 'Option 6',
        },
        {
          cat: 'Group 2',
          key: 'Option 7',
        },
      ]}
      selectedValues={[]}
    />
  );
};

MultiSelectDropdown.propTypes = {
  setMethod: PropTypes.func.isRequired,
};

export default MultiSelectDropdown;
