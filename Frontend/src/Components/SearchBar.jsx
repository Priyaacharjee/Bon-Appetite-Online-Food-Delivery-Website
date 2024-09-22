import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

const SearchBar = () => {
    return (
        <div className="input-wrapper">
            <FaMagnifyingGlass id="search-icon" />
            <input placeholder="Search here..." className="Search_input" />
        </div>
    );
};

export default SearchBar;