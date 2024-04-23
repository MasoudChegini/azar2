import React, { useState, useEffect } from "react";

const Autocomplete = () => {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [hasSearch, setHasSearch] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/cars");
      const posts = await response.json();
      setData(posts);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredData(
      data.filter((post) =>
        post.make.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  }, [inputValue, data]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleFocus = () => {
    setHasSearch(true);
  };
  const handleSelect = (make) => {
    setInputValue(make);
    setHasSearch(false);
  };
  const highlightText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map((part) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span className="bg-yellow-200">{part}</span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="w-full max-w-xs max-h-80 h-80 mx-auto bg-white bg-opacity-30 backdrop-blur-md rounded drop-shadow-lg p-4">
      <label
        htmlFor="autocomplete"
        className="block text-sm font-medium text-white"
      >
        Search
      </label>
      <input
        placeholder="Search your Car..."
        id="autocomplete"
        value={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm rounded-md shadow-sm"
      />
      <ul className="list-none mt-2 h-52 overflow-y-scroll no-scrollbar">
        {filteredData.map((post) => (
          <li
            onClick={(e) => handleSelect(post.make)}
            key={post.id}
            className={`p-2 hover:bg-gray-100  border-b-2 ${
              hasSearch ? "" : "hidden"
            }`}
          >
            {highlightText(post.make, inputValue)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Autocomplete;
