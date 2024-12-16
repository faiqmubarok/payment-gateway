import { CiSearch } from "react-icons/ci";
import propTypes from "prop-types";

const Search = ({value, setValue, placeholder}) => {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <CiSearch className="w-5 h-5 text-gray-500 " />
      </div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        name="search"
        id="search"
        placeholder={placeholder}
        className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary focus:border-primary"
      />
    </div>
  );
};

Search.propTypes = {
  value: propTypes.string,
  setValue: propTypes.func,
  placeholder: propTypes.string,
};

export default Search;
