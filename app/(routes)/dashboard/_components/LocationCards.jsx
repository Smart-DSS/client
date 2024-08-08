import React from "react";

const LocationCards = () => {
  return (
    <div className="w-full h-full max-h-[350px] md:max-h-[350px] flex flex-col m-2 p-2 rounded-lg bg-white shadow-[4px_8px_15px_#00000040]">
      <button className="w-[95%] m-2 p-3 bg-gray-200 text-gray-800 border-none rounded-md cursor-pointer transition-all hover:bg-gray-300 transform hover:scale-95">
        Sort by Alert Percentage
      </button>
      <div className="flex-1 overflow-y-auto pr-1">
        <div className="bg-gray-200 my-1.5 p-4 rounded-lg transition-transform transform hover:scale-95 cursor-pointer">
          <div className="flex justify-between items-center">
            <h3>Pambla</h3>
            <div className="relative">
              <div className="absolute top-[-1.55rem] right-[-0.15rem] bg-red-600 text-white p-1 rounded-full text-xs font-medium">
                ALERT
              </div>
              <div className="bg-gray-100 text-gray-800 p-1 rounded-md text-sm font-medium">
                100.00%
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-200 my-1.5 p-4 rounded-lg transition-transform transform hover:scale-95 cursor-pointer">
          <div className="flex justify-between items-center">
            <h3>Kallarkutty</h3>
            <div className="relative">
              <div className="absolute top-[-1.55rem] right-[-0.15rem] bg-red-600 text-white p-1 rounded-full text-xs font-medium">
                ALERT
              </div>
              <div className="bg-gray-100 text-gray-800 p-1 rounded-md text-sm font-medium">
                98.48%
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-200 my-1.5 p-4 rounded-lg transition-transform transform hover:scale-95 cursor-pointer">
          <div className="flex justify-between items-center">
            <h3>Sholayar</h3>
            <div className="relative">
              <div className="bg-gray-100 text-gray-800 p-1 rounded-md text-sm font-medium">
                36.00%
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-200 my-1.5 p-4 rounded-lg transition-transform transform hover:scale-95 cursor-pointer">
          <div className="flex justify-between items-center">
            <h3>Kallar</h3>
            <div className="relative">
              <div className="bg-gray-100 text-gray-800 p-1 rounded-md text-sm font-medium">
                33.04%
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-200 my-1.5 p-4 rounded-lg transition-transform transform hover:scale-95 cursor-pointer">
          <div className="flex justify-between items-center">
            <h3>Pamba</h3>
            <div className="relative">
              <div className="bg-gray-100 text-gray-800 p-1 rounded-md text-sm font-medium">
                25.49%
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-200 my-1.5 p-4 rounded-lg transition-transform transform hover:scale-95 cursor-pointer">
          <div className="flex justify-between items-center">
            <h3>Kundala</h3>
            <div className="relative">
              <div className="bg-gray-100 text-gray-800 p-1 rounded-md text-sm font-medium">
                22.72%
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-200 my-1.5 p-4 rounded-lg transition-transform transform hover:scale-95 cursor-pointer">
          <div className="flex justify-between items-center">
            <h3>Anayirankal</h3>
            <div className="relative">
              <div className="bg-gray-100 text-gray-800 p-1 rounded-md text-sm font-medium">
                18.61%
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-200 my-1.5 p-4 rounded-lg transition-transform transform hover:scale-95 cursor-pointer">
          <div className="flex justify-between items-center">
            <h3>Anayirankal</h3>
            <div className="relative">
              <div className="bg-gray-100 text-gray-800 p-1 rounded-md text-sm font-medium">
                18.61%
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-200 my-1.5 p-4 rounded-lg transition-transform transform hover:scale-95 cursor-pointer">
          <div className="flex justify-between items-center">
            <h3>Anayirankal</h3>
            <div className="relative">
              <div className="bg-gray-100 text-gray-800 p-1 rounded-md text-sm font-medium">
                18.61%
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-200 my-1.5 p-4 rounded-lg transition-transform transform hover:scale-95 cursor-pointer">
          <div className="flex justify-between items-center">
            <h3>Anayirankal</h3>
            <div className="relative">
              <div className="bg-gray-100 text-gray-800 p-1 rounded-md text-sm font-medium">
                18.61%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationCards;
