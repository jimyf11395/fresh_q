// src/components/SearchInput.jsx

const SearchInput = ({ placeholder, value, onChange }) => (
  <input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="search-input"
  />
);

export default SearchInput;
