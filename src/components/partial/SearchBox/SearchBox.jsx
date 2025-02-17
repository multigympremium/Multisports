import { IoSearch } from "react-icons/io5";

const SearchBox = ({ searchText, setSearchText }) => {
  return (
    <div className="relative flex items-center">
      {/* <IoSearch className="mr-2" /> */}
      <input
        type="text"
        placeholder="Search here..."
        className="border  outline-none p-2 px-3 rounded-2xl"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  );
};

export default SearchBox;
