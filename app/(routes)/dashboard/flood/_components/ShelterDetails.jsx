// import React from "react";

// const ShelterDetails = () => {
//   return (
//     <div className="flex justify-center p-[1%]">
//       <div className="w-full h-24 bg-[#f1f1f1] rounded-[15px] flex justify-between p-[5%] hover:scale-105 hover:cursor-pointer">
//         <div className="flex flex-col justify-center">
//           <div className="text-black text-xs font-semibold font-['Radio Canada'] tracking-wide">
//             SHELTER 1:
//           </div>
//           <div>
//             <span className="text-black text-xs font-semibold font-['Radio Canada'] tracking-wide">
//               Food:{" "}
//             </span>
//             <span className="text-[#02a000] text-xs font-semibold font-['Radio Canada'] tracking-wide">
//               41 days
//               <br />
//             </span>
//             <span className="text-black text-xs font-semibold font-['Radio Canada'] tracking-wide">
//               Water:{" "}
//             </span>
//             <span className="text-[#03a100] text-xs font-semibold font-['Radio Canada'] tracking-wide">
//               51 days
//               <br />
//             </span>
//             <span className="text-black text-xs font-semibold font-['Radio Canada'] tracking-wide">
//               Meds:{" "}
//             </span>
//             <span className="text-[#03a100] text-xs font-semibold font-['Radio Canada'] tracking-wide">
//               36 days
//             </span>
//           </div>
//         </div>
//         <div className="flex flex-col justify-center">
//           <div className="text-black text-xs font-semibold font-['Radio Canada'] tracking-wide">
//             Accommodation left:
//           </div>
//           <div className="text-black text-4xl font-semibold font-['Radio Canada'] tracking-widest flex justify-center">
//             46
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShelterDetails;

import React, { useState } from "react";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { app } from "@/config/FirebaseConfig";

const db = getFirestore(app);

const ShelterDetails = ({
  id,
  name,
  food,
  water,
  meds,
  accommodationLeft,
  onDelete,
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteClick = async () => {
    try {
      await deleteDoc(doc(db, "Availability", id));
      onDelete(id); // Update state in parent component
    } catch (error) {
      console.error("Error deleting document: ", error);
    } finally {
      setShowDeleteConfirm(false);
    }
  };

  const getColor = (value) => {
    if (value < 10) {
      return "text-red-600";
    } else if (value < 20) {
      return "text-orange-600";
    } else {
      return "text-green-600";
    }
  };

  return (
    <div className="flex justify-center p-[1%]">
      <div className="w-full h-24 bg-[#f1f1f1] rounded-[15px] flex justify-between p-[5%] hover:scale-105 hover:cursor-pointer relative">
        <div className="absolute bottom-2 right-2">
          <button
            className="text-red-600 hover:text-red-800 focus:outline-none opacity-20 hover:opacity-100"
            onClick={() => setShowDeleteConfirm(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              x="0px"
              y="0px"
              width="100"
              height="100"
              viewBox="0 0 24 24"
            >
              <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z"></path>
            </svg>
          </button>
        </div>

        <div className="flex flex-col justify-center">
          <div className="text-black text-xxs font-semibold font-['Radio Canada'] tracking-wide">
            {name}:
          </div>
          <div>
            <span className="text-black text-xxs font-semibold font-['Radio Canada'] tracking-wide">
              Food:{" "}
            </span>
            <span
              className={`text-xxs font-semibold font-['Radio Canada'] tracking-wide ${getColor(
                food
              )}`}
            >
              {food} days
              <br />
            </span>
            <span className="text-black text-xxs font-semibold font-['Radio Canada'] tracking-wide">
              Water:{" "}
            </span>
            <span
              className={`text-xxs font-semibold font-['Radio Canada'] tracking-wide ${getColor(
                water
              )}`}
            >
              {water} days
              <br />
            </span>
            <span className="text-black text-xxs font-semibold font-['Radio Canada'] tracking-wide">
              Meds:{" "}
            </span>
            <span
              className={`text-xxs font-semibold font-['Radio Canada'] tracking-wide ${getColor(
                meds
              )}`}
            >
              {meds} days
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="text-black text-xs font-semibold font-['Radio Canada'] tracking-wide">
            Accommodation left:
          </div>
          <div className="text-black text-4xl font-semibold font-['Radio Canada'] tracking-widest flex justify-center">
            {accommodationLeft}
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-contrast-50 confirm-dialog">
          <div className="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
            <div className="opacity-25 w-full h-full absolute z-10 inset-0"></div>
            <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative shadow-lg">
              <div className="md:flex items-center">
                <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                  <i className="bx bx-error text-3xl">&#9888;</i>
                </div>
                <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                  <p className="font-bold">Warning!</p>
                  <p className="text-sm text-gray-700 mt-1">
                    You will lose all of your data by deleting this. This action
                    cannot be undone.
                  </p>
                </div>
              </div>
              <div className="text-center md:text-right mt-4 md:flex md:justify-end">
                <button
                  id="confirm-delete-btn"
                  onClick={handleDeleteClick}
                  className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
                >
                  Delete
                </button>
                <button
                  id="confirm-cancel-btn"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShelterDetails;
