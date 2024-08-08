// import React from "react";
// import ShelterDetails from "./ShelterDetails";

// const ShelterComponent = () => {
//   return (
//     <div className="w-full h-full max-h-[400px] md:max-h-[640px] flex flex-col m-2 p-2 rounded-lg bg-white shadow-[4px_8px_15px_#00000040]">

//       <div className="w-full flex justify-center text-black text-lg font-bold font-['Radio Canada'] tracking-wide">Availability</div>
//       <div className="w-full h-[0px] border border-black m-1"></div>

//       <div className="w-full h-full  p-[2%] overflow-y-auto">
//         <ShelterDetails />
//         <ShelterDetails />
//         <ShelterDetails />
//         <ShelterDetails />
//         <ShelterDetails />
//         <ShelterDetails />
//         <ShelterDetails />
//         <ShelterDetails />
//       </div>
//     </div>
//   );
// };

// export default ShelterComponent;


import React, { useState } from "react";
import ShelterDetails from "./ShelterDetails";
import ShelterForm from "./ShelterForm";
import { useShelters } from "@/context/ShelterContext";

const ShelterComponent = () => {
  const { shelters, setShelters } = useShelters(); // Assuming setShelters is available to update state
  const [showForm, setShowForm] = useState(false);

  const handleAddShelterClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleDeleteShelter = (id) => {
    setShelters((prevShelters) => prevShelters.filter((shelter) => shelter.id !== id));
  };

  return (
    <div className="w-full h-full max-h-[400px] md:max-h-[640px] flex flex-col m-2 p-2 rounded-lg bg-white shadow-[4px_8px_15px_#00000040]">
      <div className="w-full flex justify-center items-center text-black text-lg font-bold font-['Radio Canada'] tracking-wide">
        <div>Availability</div>
      </div>
      <div className="w-full h-[0px] border border-black m-1"></div>
      <div className="w-full h-full p-[2%] overflow-y-auto">
        {shelters.map((shelter) => (
          <ShelterDetails key={shelter.id} {...shelter} onDelete={handleDeleteShelter} />
        ))}
      </div>
      {showForm && <ShelterForm onClose={handleCloseForm} />}
      <div className="flex justify-end">
        <button
          className="flex justify-center items-center w-14 h-14 rounded-full text-white border-[#4255e0] border-2 focus:outline-none bg-[#4255e0] hover:bg-white hover:text-[#4255e0] hover:scale-105"
          onClick={handleAddShelterClick}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v12M6 12h12"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ShelterComponent;
