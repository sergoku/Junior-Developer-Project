import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../../hooks/hooksForStoreUser";
import { getSearchItem, changeSearchInputValue } from "../../store/storeItems";
import "../../styles/App.css";
const Search: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(changeSearchInputValue(inputValue));
    if (inputValue.length > 0) {
      dispatch(getSearchItem(inputValue));
    }
  }, [inputValue, dispatch]);
  return (
    <div className="searchBox">
      <input
        className="searchInput"
        name=""
        type="text"
        placeholder="Search"
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />
    </div>
  );
};
export default Search;
