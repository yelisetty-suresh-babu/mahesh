import React, { useState } from "react";
import "./App.css";
import axios from "axios";

import Select from "react-select";

const App = () => {
  const [input, setInput] = useState("");
  const [numbers, setNumbers] = useState([]);
  const [alphas, setAlphas] = useState([]);
  const [highestAlphabet, setHighestAlphabet] = useState("");
  const [error, setError] = useState("");
  const [filter, setFilter] = useState({
    numbers: false,
    alpha: false,
    highestAlphabet: false,
  });

  const options = [
    { value: "alpha", label: "Alphabets" },
    { value: "numbers", label: "Numbers" },
    { value: "highestAlphabet", label: "Highest Alphabet" },
  ];
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      fontSize: 14,
      color: "black",
      backgroundColor: "white",
    }),
  };
  const handleSelectChange = (selectedOptions) => {
    const updatedFilter = {
      numbers: false,
      alpha: false,
      highestAlphabet: false,
    };
    console.log(selectedOptions);

    selectedOptions.forEach((option) => {
      updatedFilter[option.value] = true;
    });

    setFilter(updatedFilter);
  };

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(input);

      if (!Array.isArray(parsedInput.data)) {
        throw new Error(
          "Invalid JSON format. Expecting 'data' to be an array."
        );
      }

      setError("");
      console.log("Filter and Input:", filter, parsedInput);

      const res = await axios.post(
        "https://mahesh-42ok.onrender.com/bfhl",
        parsedInput
      );

      console.log(res.data);

      setNumbers(res.data.numbers || []);
      setAlphas(res.data.alphabets);
      setHighestAlphabet(res.data.highest_lowercase_alphabet || "");
    } catch (e) {
      console.error(e);
      setError("Invalid JSON input. Please check your input format.");
    }
  };

  const toggleFilter = (filterName) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [filterName]: !prevFilter[filterName],
    }));
  };

  return (
    <div className="container">
      <div className="input-section">
        <label htmlFor="api-input">API Input (JSON)</label>
        <textarea
          id="api-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows="5"
          className="p-3 w-full"
          placeholder=""
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 my-1 py-1 text-white"
        >
          Submit
        </button>
        {error && <div className="error-message text-red-500">{error}</div>}
      </div>

      <p>Multi-Filter</p>
      <Select
        isMulti
        name="filters"
        options={options}
        styles={customStyles}
        onChange={handleSelectChange}
        className="basic-multi-select"
        classNamePrefix="select"
      />

      <div className="response-section">
        <div className="py-2">
          <strong>Filtered Response</strong>
        </div>
        {filter.numbers && <div>Numbers: {numbers.join(", ")}</div>}
        {filter.alpha && <div>Alphabets: {alphas.join(", ")}</div>}
        {filter.highestAlphabet && (
          <div>Highest lowercase alphabet: {highestAlphabet}</div>
        )}
      </div>
    </div>
  );
};

export default App;
