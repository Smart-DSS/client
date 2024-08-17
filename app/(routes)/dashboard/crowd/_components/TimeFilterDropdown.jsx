import React, { useState } from "react";
// import { FaChevronDown } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";

const TimeFilterDropdown = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("Filter");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleFilterChange = (period) => {
    setSelectedPeriod(period);
    onFilterChange(period);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div className="w-full flex justify-end">
        <button
          type="button"
          className="inline-flex justify-between w-full px-2 bg-gray-100 hover:bg-gray-200 text-black rounded-full"
          onClick={toggleDropdown}
        >
          {selectedPeriod} <CiFilter className="ml-1 mt-1" />
        </button>
      </div>
      {isOpen && (
        <div className="absolute right-0 z-10 w-48 mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
              onClick={() => handleFilterChange("Last hour")}
            >
              Last hour
            </button>
            <button
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
              onClick={() => handleFilterChange("Today")}
            >
              Today
            </button>
            <button
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
              onClick={() => handleFilterChange("This week")}
            >
              This week
            </button>
            <button
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
              onClick={() => handleFilterChange("This month")}
            >
              This month
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeFilterDropdown;
