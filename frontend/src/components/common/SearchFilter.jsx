import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

const SearchFilter = () => {
  return (
    <div className="flex justify-between px-8 pb-8 bg-white">
      <div className="flex w-max-[480px] px-7 py-[14px] w-[480px]">
        <input
          type="text"
          placeholder="Search Task"
          className="grow outline-none"
        />
        <SearchIcon style={{ color: '#8E92BC' }} />
      </div>
      <div className="flex gap-3 items-center">
        <FilterListIcon />
        <select name="sort" id="sort">
          <option value="SortBy : Deadline">SortBy : Deadline</option>
          <option value="SortBy : Progress">SortBy : Progress</option>
        </select>
      </div>
    </div>
  );
};

export default SearchFilter;
